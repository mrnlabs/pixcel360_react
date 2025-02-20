<?php

use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('subscriptions')->group(function () {
    Route::get('/', [SubscriptionController::class, 'index'])->name('subscriptions');
});