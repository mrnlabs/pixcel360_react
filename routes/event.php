<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\VideoSettingsController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('events')->group(function () {
Route::get('/', [EventController::class, 'index'])->name('events');
Route::get('/create', [EventController::class, 'create'])->name('event.create');
Route::post('/store', [EventController::class, 'store'])->name('events.store');
Route::get('/edit/{slug}', [EventController::class, 'edit'])->name('event.edit');
Route::patch('/update/{slug}', [EventController::class, 'update'])->name('event.update');
Route::delete('/delete/{id}', [EventController::class, 'destroy'])->name('delete_event');
Route::post('/duplicate/{slug}', [EventController::class, 'duplicate'])->name('duplicate_event');

Route::patch('/update-vedio-settings/{slug}', [VideoSettingsController::class, 'updateVedioSettings'])->name('event.update.vedio.settings');
Route::post('/update-vedio-functions/{slug}', [VideoSettingsController::class, 'updateVedioFunctions'])->name('event.update.vedio.functions');

Route::post('/upload-vedio-audio/{slug}', [VideoSettingsController::class, 'uploadVedioAudio'])->name('event.update.audio');
Route::delete('/delete-vedio-audio/{slug}', [VideoSettingsController::class, 'uploadVedioAudio'])->name('event.update.delete');
Route::patch('/update-vedio-timeouts/{slug}', [VideoSettingsController::class, 'updateVedioTimeouts'])->name('event.update.vedio.timeouts');
Route::patch('/update-vedio-sharing-method/{slug}', [VideoSettingsController::class, 'updateVedioSharingMethod'])->name('event.update.vedio.sharing.methods');
Route::patch('/update-vedio-subjects/{slug}', [VideoSettingsController::class, 'updateVedioSubjects'])->name('event.update.vedio.subjects');
Route::patch('/update-vedio-branding/{slug}', [VideoSettingsController::class, 'updateVedioBranding'])->name('event.update.vedio.branding');
Route::post('/update-logo-image/{slug}', [VideoSettingsController::class, 'updateVedioLogoImage'])->name('event.update.vedio.logo.image');
Route::delete('/remove-logo-image/{slug}', [VideoSettingsController::class, 'updateVedioLogoImage'])->name('remove_logo_image');

// header search
Route::get('/header-search', [EventController::class, 'searchEventHeader']);
Route::post('/close-event', [EventController::class, 'closeEvent'])->name('events.close');



});