<?php

use App\Http\Controllers\OverlayController;
use Illuminate\Support\Facades\Route;

// Route::middleware(['auth'])->prefix('subscriptions')->group(function () {


Route::middleware(['auth'])->prefix('overlays')->group(function () {
    Route::get('/{slug}', [OverlayController::class, 'index'])->name('overlays');
    Route::delete('/{slug}', [OverlayController::class, 'destroy'])->name('overlays.destroy');
});