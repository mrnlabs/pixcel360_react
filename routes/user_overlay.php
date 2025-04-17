<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserOverlayController;

// Route::middleware(['auth'])->prefix('subscriptions')->group(function () {


Route::middleware(['auth'])->prefix('overlays')->group(function () {
    Route::get('/', [UserOverlayController::class, 'index'])->name('user.overlays');
    Route::delete('/{overlayId}', [UserOverlayController::class, 'destroy'])->name('user.overlays.destroy');
    Route::post('/store', [UserOverlayController::class, 'store'])->name('user.overlays.store');
    Route::post('/addOverlayToEvent/{overlayId}', [UserOverlayController::class, 'addOverlayToEvent'])->name('user.overlays.addOverlayToEvent');
    Route::get('/selected-overlay', [UserOverlayController::class, 'displaySelectedOverlay'])->name('user.overlays.display_selected_overlay');
    Route::get('/get-event-overlays/{slug}', [UserOverlayController::class, 'getEventOverlays'])->name('user.overlays.get_event_overlays');
    Route::get('/overlays/download', [UserOverlayController::class, 'downloadOverlayImage'])->name('get.signed.download.url');
    Route::get('/my-overlays/{event_slug}', [UserOverlayController::class, 'getAllOverlays'])->name('get.all.overlays');
    
});