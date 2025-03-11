<?php

use App\Http\Controllers\API\EventAPIController;
use App\Http\Controllers\API\EventSettingAPIController;
use App\Http\Controllers\UserOverlayController;
use Illuminate\Http\Request;
use App\Models\Plan;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

Route::get('/clear-cache', function () {
    Artisan::call('optimize:clear');
    Artisan::call('storage:link');
    Artisan::call('config:cache');
    return "success";
});

Route::post('/active-event', [EventAPIController::class, 'activateEvent'])->name('event.activate');
Route::post('/upload-event-video', [EventAPIController::class, 'uploadVideo'])->name('event.upload.video');
Route::post('/update-fields', [EventSettingAPIController::class, 'updateField'])->name('event.update.fields');
Route::post('/upload-audio', [EventSettingAPIController::class, 'uploadAudio'])->name('event.upload.audio');
Route::post('/upload-overlay', [UserOverlayController::class, 'store']);


// Get Plans
Route::get('/plans', function() {$plans = Plan::with('category')->latest()->get();return response()->json($plans);});

require __DIR__.'/wordpress.php';

