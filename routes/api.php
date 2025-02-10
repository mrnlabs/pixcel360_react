<?php

use App\Http\Controllers\API\EventAPIController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/active-event', [EventAPIController::class, 'activateEvent'])->name('event.activate');
Route::post('/upload-event-video', [EventAPIController::class, 'uploadVideo'])->name('event.upload.video');
