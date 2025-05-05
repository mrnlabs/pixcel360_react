<?php

namespace App\Http\Controllers\API;

use Throwable;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\Video;
use Illuminate\Http\Request;
use App\Jobs\ProcessVideoJob;
use App\Services\EventService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;
use App\Services\VideoSettingsService;
use Illuminate\Support\Facades\Storage;
use App\Services\SharingSettingsService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Pion\Laravel\ChunkUpload\Receiver\FileReceiver;
use Pion\Laravel\ChunkUpload\Handler\HandlerFactory;
use Pion\Laravel\ChunkUpload\Exceptions\UploadMissingFileException;

class EventAPIController extends Controller
{

    protected  EventService $eventService;
    protected VideoSettingsService $videoSettingsService;
    protected SharingSettingsService $sharingSettingService;
   
    public function __construct(
        EventService $eventService,
         VideoSettingsService $videoSettingsService, 
         SharingSettingsService $sharingSettingService)

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
                $user = User::whereId($event->user_id)->first();
                
                $currentSubscription = $user ? $user->currentSubscription()->with('plan')->first() : null;
            
                ProcessVideoJob::dispatch($video, $currentSubscription)->onQueue('video-processing');
                
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

 /*   public function uploadVideo(Request $request)
{
    Log::info('Received video upload request');
    $validator = Validator::make($request->all(), [
        'video' => 'required|mimes:mp4,mov,avi,m4v,flv',
        'slug' => 'required|exists:events,slug'
    ]);
    Log::info('Passed validation...');
    if ($validator->fails()) {
        Log::error('Validation errors: ' . json_encode($validator->errors()->all()));
        return response()->json([
            'status' => false,
            'message' => $validator->errors()->first()
        ], 400);
    }

    try {
        // Create the file receiver
        $receiver = new FileReceiver('video', $request, HandlerFactory::classFromRequest($request));

        // Check if the upload is success
        if ($receiver->isUploaded() === false) {
            throw new UploadMissingFileException();
        }

        // Receive the file
        $save = $receiver->receive();

        // Check if the upload has finished
        if ($save->isFinished()) {
            // Save the file and process it
            $file = $save->getFile();
            $response = $this->saveVideo($file, $request->slug);

            // Delete chunks directory if exists
            if (Storage::exists('chunks')) {
                Storage::deleteDirectory('chunks');
            }

            return response()->json([
                'message' => 'Video uploaded successfully and queued for processing',
                'path' => $response['path'],
                'video' => $response['video']
            ], 200);
        }

        // We are in chunk mode, send the current progress
        $handler = $save->handler();
        return response()->json([
            'done' => $handler->getPercentageDone(),
            'status' => true
        ]);
    } catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => $th->getMessage()
        ], 500);
    }
}

protected function saveVideo(UploadedFile $file, $eventSlug)
{
    $event = Event::where('slug', $eventSlug)->firstOrFail();
    
    // Generate a unique filename with original extension
    $fileName = $this->generateVideoFilename($file);
    
    // Store the file in S3
    $filePath = Storage::putFileAs('video_uploads', $file, $fileName);
    $url = Storage::url($filePath);
    
    // Create video record
    $video = Video::create([
        'name' => $file->getClientOriginalName(),
        'path' => $url,
        'event_id' => $event->id,
        'size' => $file->getSize(),
        'status' => 'uploaded'
    ]);
    
    // Dispatch processing job
    ProcessVideoJob::dispatch($video)->onQueue('video-processing');
    
    return [
        'path' => $url,
        'video' => $video
    ];
}

protected function generateVideoFilename(UploadedFile $file)
{
    $extension = $file->getClientOriginalExtension();
    return 'vid_' . time() . '_' . bin2hex(random_bytes(8)) . '.' . $extension;
}
*/
        public function activateEvent(Request $request){

           try {
            $event = Event::with('setting','boomerang_setting','sharing_method','sharing_subject')->where('slug', $request->slug)->first();
                if(!$event){
                    return response()->json(['message' => 'Event not found.'], 404);
                }
                if($request->close_event){
                    $event->update(['status' => '2']);
                    return response()->json(['message' => 'Event closed successfully.'], 200);
                }

                $validator = Validator::make($request->all(), [
                    'slug' => 'required|string|max:255',
                    //  'device_name' => 'required|string|max:255',
                    //  'device_id' => 'required|string|max:255',
                ]);
                
                if ($validator->fails()) {
                    return response()->json([
                        'status' => false,
                        'message' => $validator->errors()->first()
                    ], 400);
                }
                if(userHasNoSubscription()){
                    return response()->json([
                        'status' => false,
                        'message' => 'You have no active subscription.'
                    ], 403);
                }

                $user= User::whereId($event->user_id)->first();
     
               $hasReachedLimit = $user->activeEvents()->count() >= env('EVENT_LIMIT_NUM', 4);
                // Check if the user has reached the device limit
                if ($hasReachedLimit) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Events limit reached.'
                    ], 403);
                }
                $deviceExists = DB::table('devices')->where('device_id', $request->device_id)->exists();
                if(!$deviceExists){
                    DB::table('devices')->insert([
                        'device_name' => $request->device_name ?? 'Unknown',
                        'device_id' => $request->device_id ?? 'Unknown',
                    ]);
                }
               
                $event->update(['status' => true]);
                $data = new EventResource($event);
                return response()->json($data->toArray(request()));
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
