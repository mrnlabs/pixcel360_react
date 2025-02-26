<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SubscriptionController;

// Route::middleware(['auth'])->prefix('subscriptions')->group(function () {


Route::middleware(['auth'])->prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index'])->name('users');
    Route::get('/{slug}', [UserController::class, 'show'])->name('users.show');
    Route::delete('/{slug}', [UserController::class, 'destroy'])->name('users.destroy');
});