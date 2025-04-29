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
    $currentWeekday = $now->dayOfWeek; // 0 (Sunday) to 6 (Saturday)
    $currentTime = $now->format('H:i');
    
    // Find all active schedules for today's weekday (or null/every day)
    $dueSchedules = BackupSchedule::where('is_active', true)
        ->where(function($query) use ($currentWeekday) {
            $query->where('weekday', $currentWeekday)
                  ->orWhereNull('weekday');
        })
        ->whereRaw("TIME(time_of_day) <= ?", [$currentTime])
        ->get();
        
    foreach ($dueSchedules as $schedule) {
        $this->info("Running scheduled backup: {$schedule->name}");
        DatabaseBackupJob::dispatch();
        
        // Handle frequency logic differently now
        // No need to update weekday or time_of_day
        if ($schedule->frequency === 'once') {
            $schedule->is_active = false;
        }
        
        $schedule->save();
    }
    
    $this->info("Completed running scheduled backups.");
    }
}
