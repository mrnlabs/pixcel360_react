<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\BackupSchedule;
use App\Jobs\DatabaseBackupJob;
use App\Jobs\CleanupOldBackupsJob;

class BackupController extends Controller
{
    public function index()
    {
        $schedules = BackupSchedule::orderBy('weekday')->orderBy('time_of_day')->get();
        
        return Inertia::render('Backups/Index', [
            'schedules' => $schedules->map(function ($schedule) {
                return [
                    'id' => $schedule->id,
                    'name' => $schedule->name,
                    'weekday' => $schedule->weekday,
                    'weekday_name' => $this->getWeekDayName($schedule->weekday), // Using the method we defined
                    'time_of_day' => date('H:i', strtotime($schedule->time_of_day)),
                    'frequency' => $schedule->frequency,
                    'is_active' => $schedule->is_active,
                ];
            })
        ]);
    }

    function getWeekDayName($weekday) {
        $weekdays = [
            0 => 'Sunday',
            1 => 'Monday',
            2 => 'Tuesday',
            3 => 'Wednesday',
            4 => 'Thursday',
            5 => 'Friday',
            6 => 'Saturday'
        ];
        
        return $weekdays[$weekday] ?? null;
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'weekday' => 'required',
            'time_of_day' => 'required',
            'frequency' => 'required|in:once,daily,weekly,monthly',
        ]);
       
        $schedule = BackupSchedule::create([
            'name' => $validated['name'],
            'weekday' => $validated['weekday'],
            'time_of_day' => $request->time_of_day,
            'frequency' => $validated['frequency'],
        ]);
        
        // If it's scheduled for now or in the past, dispatch the job immediately
        if (Carbon::parse($schedule->scheduled_at)->isPast()) {
            DatabaseBackupJob::dispatch();
        }
        
        return redirect()->back()->with('success', 'Backup scheduled successfully.');
    }
    
    public function runNow()
    {
        DatabaseBackupJob::dispatch();
        
        return redirect()->back()->with('success', 'Backup job dispatched.');
    }
    
    public function destroy(BackupSchedule $backupSchedule)
    {
        $backupSchedule->delete();
        
        return redirect()->back()->with('success', 'Schedule removed.');
    }

    public function cleanup()
{
    CleanupOldBackupsJob::dispatch();
    
    return redirect()->back()->with('success', 'Backup cleanup job dispatched.');
}
}
