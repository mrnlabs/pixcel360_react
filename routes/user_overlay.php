<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserOverlayController;

// Route::middleware(['auth'])->prefix('subscriptions')->group(function () {


Route::middleware(['auth'])->prefix('overlays')->group(function () {
    Route::get('/{slug}', [UserOverlayController::class, 'index'])->name('user.overlays');
    Route::delete('/{slug}', [UserOverlayController::class, 'destroy'])->name('user.overlays.destroy');
    Route::post('/store', [UserOverlayController::class, 'store'])->name('user.overlays.store');
    Route::post('/addOverlayToEvent/{overlayId}', [UserOverlayController::class, 'addOverlayToEvent'])->name('user.overlays.addOverlayToEvent');
Route::get('/selected-overlay/{overlayId}', [UserOverlayController::class, 'displaySelectedOverlay'])->name('user.overlays.display_selected_overlay');
    
});