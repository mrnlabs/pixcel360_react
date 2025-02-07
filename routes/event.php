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

});