<?php

use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('subscriptions')->group(function () {
    Route::get('/checkout/{slug}', [SubscriptionController::class, 'showSubscriptionForm'])
        ->name('subscription.checkout');
    Route::post('/process', [SubscriptionController::class, 'processSubscription'])
        ->name('subscription.process');
    Route::get('/success', [SubscriptionController::class, 'success'])
        ->name('subscription.success');
    Route::post('/cancel', [SubscriptionController::class, 'cancel'])
        ->name('subscription.cancel');
    Route::post('/resume', [SubscriptionController::class, 'resume'])
        ->name('subscription.resume');
});