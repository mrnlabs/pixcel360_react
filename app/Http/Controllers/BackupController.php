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
        $schedules = BackupSchedule::orderBy('scheduled_at')->get();
        
        return Inertia::render('Backups/Index', [
            'schedules' => $schedules
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'scheduled_at' => 'required|date',
            'frequency' => 'required|in:once,daily,weekly,monthly',
        ]);
        
        $schedule = BackupSchedule::create($validated);
        
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
