<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;
use App\Services\EventService;
use App\Services\VideoSettingsService;
use App\Services\SharingSettingsService;
use App\Http\Requests\VideoUploadRequest;
use App\Jobs\ProcessVideoJob;
use App\Models\Video;
use Illuminate\Support\Facades\Storage;
use Throwable;

class EventAPIController extends Controller
{

    protected  EventService $eventService;
    protected VideoSettingsService $videoSettingsService;
    protected SharingSettingsService $sharingSettingService;
    public function __construct(EventService $eventService, VideoSettingsService $videoSettingsService, SharingSettingsService $sharingSettingService)

    {
        $this->eventService = $eventService;
        $this->videoSettingsService = $videoSettingsService;
        $this->sharingSettingService = $sharingSettingService;
    }

    /**
     * Display a listing of the resource.
     */
    public function uploadVideo(Request $request)
    {
        try {
           
            if ($request->hasFile('video')) {
                $event = Event::where('slug', $request->slug)->first();
                $filePath = Storage::put('video_uploads', $request->file('video'));
                
                $url = Storage::url($filePath);
                $video = Video::create([
                    'name' => $request->file('video')->getClientOriginalName(),
                    'path' => $url,
                    'event_id' => $event->id,
                    'size' => $request->file('video')->getSize()
                ]);

                // Dispatch the video processing job
                ProcessVideoJob::dispatch($video)->onQueue('video-processing');
                
                return response()->json([
                    'message' => 'Video uploaded successfully and queued for processing',
                    'path' => $url,
                    'video' => $video
                ], 200);
            }
        
            return response()->json(['message' => 'No file uploaded'], 400);
        } catch (Throwable $th) {
            throw $th;
        }
    }

        public function activateEvent(Request $request){
            $request->validate(['slug' => 'required|string|max:255']);
           try {
                $event = $this->eventService->getEvent($request->slug);
                $event->update(['status' => true]);
                return response()->json($event);
           } catch (\Throwable $th) {
             return response()->json(['message' => $th->getMessage()], 400);
           }
        }

        public function getProcessingStatus($id)
        {
            try {
                $video = Video::findOrFail($id);
                
                return response()->json([
                    'is_processed' => $video->is_processed,
                    'processing_failed' => $video->processing_failed,
                    'processed_at' => $video->processed_at,
                    'processed_video_path' => $video->processed_video_path,
                ]);
            } catch (Throwable $th) {
                throw $th;
            }
        }

}
