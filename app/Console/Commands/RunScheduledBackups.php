<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\DatabaseBackupJob;
use App\Models\BackupSchedule;
use Carbon\Carbon;

class RunScheduledBackups extends Command
{
  

    protected $signature = 'backups:run-scheduled';
    protected $description = 'Run any database backups that are scheduled for now';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now();
        
        // Find all active schedules that are due
        $dueSchedules = BackupSchedule::where('is_active', true)
            ->where('scheduled_at', '<=', $now)
            ->get();
            
        foreach ($dueSchedules as $schedule) {
            $this->info("Running scheduled backup: {$schedule->name}");
            DatabaseBackupJob::dispatch();
            
            // Update schedule based on frequency
            switch ($schedule->frequency) {
                case 'once':
                    $schedule->is_active = false;
                    break;
                case 'daily':
                    $schedule->scheduled_at = Carbon::parse($schedule->scheduled_at)->addDay();
                    break;
                case 'weekly':
                    $schedule->scheduled_at = Carbon::parse($schedule->scheduled_at)->addWeek();
                    break;
                case 'monthly':
                    $schedule->scheduled_at = Carbon::parse($schedule->scheduled_at)->addMonth();
                    break;
            }
            
            $schedule->save();
        }
        
        $this->info("Completed running scheduled backups.");
    }
}
