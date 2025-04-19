<?php

namespace App\Console\Commands;

use App\Models\Video;
use App\Jobs\ProcessVideoJob;
use Illuminate\Console\Command;

class ReprocessVideos extends Command
{

    protected $signature = 'videos:reprocess';
    protected $description = 'Reprocess all videos that have not been processed yet';

    /**
     * Execute the console command.
     */
    public function handle()
    {
      $unprocessedVideos = Video::whereNull('processed_video_path')->get();
        
        $count = $unprocessedVideos->count();
        
        if ($count === 0) {
            $this->info('No unprocessed videos found.');
            return 0;
        }
        
        $this->info("Found {$count} unprocessed videos. Starting reprocessing...");
        
        $bar = $this->output->createProgressBar($count);
        $bar->start();
        
        foreach ($unprocessedVideos as $video) {
            ProcessVideoJob::dispatch($video)->onQueue('video-processing');
            $bar->advance();
        }
        
        $bar->finish();
        $this->newLine();
        $this->info("All {$count} unprocessed videos have been requeued for processing.");
        
        return 0;
    }
}
