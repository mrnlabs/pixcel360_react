<?php

use App\Http\Controllers\OverlayController;
use Illuminate\Support\Facades\Route;

// Route::middleware(['auth'])->prefix('subscriptions')->group(function () {


Route::middleware(['auth'])->prefix('admin-overlays')->group(function () {
    Route::get('/', [OverlayController::class, 'index'])->name('admin.overlays.index');
    Route::post('/create', [OverlayController::class, 'store'])->name('admin.overlays.store');
    Route::get('/{slug}', [OverlayController::class, 'show'])->name('overlays.show');
    Route::delete('/{slug}', [OverlayController::class, 'destroy'])->name('overlays.destroy');
});