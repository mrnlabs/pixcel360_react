<?php

namespace App\Jobs;

use App\Models\Video;
use App\Models\Overlay;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class ProcessVideoJob implements ShouldQueue
{
    use Queueable;

      /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;

    /**
     * The number of seconds to wait before retrying the job.
     *
     * @var int
     */
    public $backoff = 60;

    /**
     * The number of seconds the job can run before timing out.
     *
     * @var int
     */
    public $timeout = 180;


    /**
     * The video instance.
     *
     * @var \App\Models\Video
     */
    protected $video;

    /**
     * Create a new job instance.
     */
    public function __construct(Video $video)
    {
        $this->video = $video;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            // Get the current video ID for potential logging
            $currentVideoId = $this->video->id;
    
            // Use a lock to ensure only one job runs at a time
            $lock = Cache::lock('video_processing_lock', 180);
    
            // Attempt to acquire the lock
            if (!$lock->get()) {
                Log::info('Skipping video processing - another job is in progress', [
                    'video_id' => $currentVideoId,
                ]);
                return;
            }
    
           
    
            // Process the video
            $videoPath = $this->video->path;
            $videoSettings = $this->video->event->boomerang_setting;
            $event = $this->video->event;
            $eventOverlay = Overlay::find($event->overlay_id);
    
            $data = [
                'trim_start' => 0,
                'play_to_sec' => $videoSettings->duration ?? 3,//duration
                'slow_factor' => $videoSettings->speed ?? 0.7,//speed
                'effect' => 'slomo_boomerang',
                'video_url' => $videoPath,
                // 'audio_url' => $videoSettings->add_audio_file,
            ];
            if ($videoSettings->add_audio_file) {
                $data['audio_url'] = $videoSettings->add_audio_file;
            }

            if ($eventOverlay) {
                $data['overlay_url'] = $eventOverlay->path;
            }
    
            $stringifiedData = http_build_query($data);
    
            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'Content-Type' => 'application/x-www-form-urlencoded',
            ])
                ->timeout(300)
                ->withBody($stringifiedData, 'application/x-www-form-urlencoded')
                ->post(config('services.video_processing.endpoint'));
    
            if ($response->successful()) {
                $processedData = $response->json();
    
                // Update the video with processed path and status
                $this->video->update([
                    // 'processed_video_path' => $processedData['processed_path'] ?? null,
                    'is_processed' => true,
                    'processed_at' => now(),
                ]);
    
            }
        } catch (\Exception $exception) {
            // If we have a job ID, update its status
            if (isset($jobId)) {
                DB::table('video_processing_jobs')
                    ->where('id', $jobId)
                    ->update([
                        'status' => 'failed',
                        'error_message' => substr($exception->getMessage(), 0, 255),
                        'updated_at' => now(),
                    ]);
            }
    
            Log::error('Video processing job failed', [
                'video_id' => $this->video->id ?? $currentVideoId ?? 'unknown',
                'job_id' => $jobId ?? 'not_created',
                'exception' => $exception->getMessage(),
                'trace' => $exception->getTraceAsString(),
            ]);
    
            // This will trigger a retry if we haven't exceeded $tries
            throw $exception;
        } finally {
            // Release the lock
            if (isset($lock)) {
                $lock->release();
            }
        }
    }

    public function failed(\Throwable $exception)
    {
        // Update the video status to indicate failure if all retries are exhausted
        $this->video->update([
            'processing_failed' => true,
            'processing_error' => $exception->getMessage()
        ]);
        
        Log::error('All video processing attempts failed', [
            'video_id' => $this->video->id,
            'exception' => $exception->getMessage()
        ]);
    }
}
