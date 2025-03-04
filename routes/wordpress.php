<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WordpressUserController;

Route::prefix('wordpress')->group(function () {
    Route::post('/register', [WordpressUserController::class, 'registerWordPressUser'])->name('user.wordpress');
});