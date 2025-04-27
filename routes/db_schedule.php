<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BackupController;


// In routes/web.php
    Route::middleware(['auth'])->group(function () {
    Route::get('/backup/schedule', [BackupController::class, 'index'])->name('backup.schedule');
    Route::post('/backup/schedule', [BackupController::class, 'store'])->name('backup.schedule.store');
    Route::post('/backup/run-now', [BackupController::class, 'runNow'])->name('backup.run-now');
    Route::delete('/backup/schedule/{backupSchedule}', [BackupController::class, 'destroy'])->name('backup.schedule.destroy');
    Route::post('/backup/cleanup', [BackupController::class, 'cleanup'])->name('backup.cleanup');
});