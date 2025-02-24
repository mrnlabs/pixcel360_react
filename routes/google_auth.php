<?php

use App\Http\Controllers\Auth\GoogleController;
use Illuminate\Support\Facades\Route;

Route::middleware(['guest'])->group(function () {
    Route::get('auth/google', [GoogleController::class, 'redirectToGoogle']);
    Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);
});