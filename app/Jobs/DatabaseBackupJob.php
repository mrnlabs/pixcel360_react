<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Spatie\Backup\Tasks\Backup\BackupJobFactory;

class DatabaseBackupJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    protected $filename;
    public function __construct($filename = null)
    {
        $this->filename = $filename ?: 'db-backup-' . now()->format('Y-m-d-H-i-s');
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $exitCode = Artisan::call('backup:run', [
            '--only-db' => true
        ]);
    }
}
