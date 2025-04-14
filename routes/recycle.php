<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserOverlayController;

// Route::middleware(['auth'])->prefix('subscriptions')->group(function () {


Route::middleware(['auth'])->prefix('recycle-bin')->group(function () {
    // Route::get('/', [RecycleController::class, 'index'])->name('user.overlays');
    
});