<?php

namespace App\Http\Controllers;

use App\Models\Video;
use App\Jobs\ProcessVideoJob;
use Throwable;

class ReprocessVideoController extends Controller
{
    public function reprocessUnprocessedVideos()
{
    try {
        // Find all videos where processed_at is null
        $unprocessedVideos = Video::whereNull('processed_at')->get();
        
        $count = 0;
        
        foreach ($unprocessedVideos as $video) {
            // Dispatch the processing job for each unprocessed video
            ProcessVideoJob::dispatch($video)->onQueue('video-processing');
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