<?php

namespace App\Jobs;

use App\Models\Overlay;
use App\Models\Video;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
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
        // Get video details
        $videoPath = $this->video->path;
        $videoSettings = $this->video->event->boomerang_setting;
        $event = $this->video->event;
        $eventOverlay = Overlay::find($event->overlay_id);
        Log::info('Processing video: ' . $videoSettings);
        Log::info('Event: ' . $event);
        Log::info('Overlay: ' . $eventOverlay);
        // Create data array
        $data = [
            'trim_start' => 0,
            'play_to_sec' => 3,
            'slow_factor' => 0.7,
            'effect' => 'slomo_boomerang',
            'video_url' => $videoPath,
            // 'audio_url' => $videoSettings->add_audio_file,
            'audio_url' => "https://picxel-bucket.s3.af-south-1.amazonaws.com/audios/Someone_Elses_Eyes.mp3",
            'overlay_url' => $eventOverlay->path
        ];
        // Log::info($data);
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
                'processed_video_path' => $processedData['processed_path'] ?? null,
                'is_processed' => true,
                'processed_at' => now(),
            ]);
            
            Log::info('Video processed successfully', [
                'video_id' => $this->video->id,
                'processed_path' => $processedData['processed_path'] ?? null
            ]);
        } else {
            
            Log::error('Video processing API error', [
                'video_id' => $this->video->id,
                'status' => $response->status(),
                'response' => $response->body()
            ]);
            
            throw new \Exception('Video processing API error: ' . $response->body());
        }
           
    } catch (\Exception $exception) {
        Log::error('Video processing job failed', [
            'video_id' => $this->video->id,
            'exception' => $exception->getMessage()
        ]);
        
        // This will trigger a retry if we haven't exceeded $tries
        throw $exception;
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
