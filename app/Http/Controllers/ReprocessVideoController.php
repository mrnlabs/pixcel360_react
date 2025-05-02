<?php

namespace App\Http\Controllers;

use Throwable;
use App\Models\User;
use App\Models\Event;
use App\Models\Video;
use App\Jobs\ProcessVideoJob;

class ReprocessVideoController extends Controller
{
    public function reprocessUnprocessedVideos()
{
    try {
        // Find all videos where processed_video_path is null
        $unprocessedVideos = Video::whereNull('processed_video_path')->get();
        
        $count = 0;

        $event = Event::where('slug', request('slug'))->first();
        // Dispatch the video processing job
        $user = User::whereId($event->user_id)->first();
        
        $currentSubscription = $user ? $user->currentSubscription()->with('plan')->first() : null;
        
        foreach ($unprocessedVideos as $video) {
            // Dispatch the processing job for each unprocessed video
            ProcessVideoJob::dispatch($video, $currentSubscription)->onQueue('video-processing');
            $count++;
        }
        
        return response()->json([
            'message' => $count . ' unprocessed videos have been requeued for processing',
            'count' => $count
        ], 200);
    } catch (Throwable $th) {
        return response()->json([
            'message' => 'Error reprocessing videos',
            'error' => $th->getMessage()
        ], 500);
    }
}
}