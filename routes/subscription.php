<?php

use App\Http\Controllers\PaymentGateWays\PayFastController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;

// Route::middleware(['auth'])->prefix('subscriptions')->group(function () {


Route::middleware(['auth'])->prefix('subscriptions')->group(function () {
    Route::get('/', [SubscriptionController::class, 'index'])->name('subscriptions');
    Route::get('/show/{slug}', [SubscriptionController::class, 'show'])->name('subscriptions.show');
    Route::post('/subscribe/{slug}', [PayFastController::class, 'subscribe'])->name('subscribe');
    Route::get('/subscribe', [PayFastController::class, 'subscribtionExpired'])->name('subscription.expired');
    Route::get('/trial-ended', [SubscriptionController::class, 'trialEnded'])->name('subscription.trial-ended');
});