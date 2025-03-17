<?php

use App\Models\Plan;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\UserOverlayController;
use App\Http\Controllers\API\EventAPIController;
use App\Http\Controllers\API\EventSettingAPIController;
use App\Http\Controllers\Gallery\GalleryController;

Route::get('/clear-cache', function () {
    Artisan::call('optimize:clear');
    Artisan::call('storage:link');
    Artisan::call('config:cache');
    return "success";
});

Route::post('/active-event', [EventAPIController::class, 'activateEvent'])->name('event.activate');

Route::post('/upload-event-video', [EventAPIController::class, 'uploadVideo'])->name('event.upload.video');
Route::post('/update-fields', [EventSettingAPIController::class, 'updateField'])->name('event.update.fields');

Route::post('/upload-overlay', [UserOverlayController::class, 'store']);


Route::get('/gallery', [GalleryController::class, 'get_gallery_api']);


// Get Plans
Route::get('/plans', function() {$plans = Plan::with('category')->latest()->get();return response()->json($plans);});

require __DIR__.'/wordpress.php';
require __DIR__.'/audio.php';

