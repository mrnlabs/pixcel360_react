<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AudioPIController;
use App\Http\Controllers\API\EventSettingAPIController;


Route::get('/s3-audio-presigned-url', [AudioPIController::class, 'getPresignedUrl'])->name('get.presigned.url');
Route::post('/update-audio/{slug}', [AudioPIController::class, 'updateAudioS3'])->name('event.update.audio.s3');
Route::post('/upload-audio', [EventSettingAPIController::class, 'uploadAudio'])->name('event.upload.audio');