<?php

use Inertia\Inertia;
use App\Models\PaymentAttempt;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\PaymentGateWays\PayFastController;

// Route::middleware(['auth'])->prefix('subscriptions')->group(function () {


Route::middleware(['auth'])->prefix('subscriptions')->group(function () {
    Route::get('/', [SubscriptionController::class, 'index'])->name('subscriptions');
    Route::get('/show/{slug}', [SubscriptionController::class, 'show'])->name('subscriptions.show');
    Route::post('/subscribe/{slug}', [PayFastController::class, 'subscribe'])->name('subscribe');
    Route::get('/subscribe', [PayFastController::class, 'subscribtionExpired'])->name('subscription.expired');
    Route::get('/trial-ended', [SubscriptionController::class, 'trialEnded'])->name('subscription.trial-ended');
    Route::get('/renew', [SubscriptionController::class, 'renew'])->name('subscription.renew');
});

Route::get('/resume-subscription/{identifier}', function ($identifier) {
    $attempt = PaymentAttempt::where('identifier', $identifier)->first();
    
    if (!$attempt) {
        return redirect()->route('home')->with('error', 'Invalid subscription link');
    }
    
    // Redirect to the payment page with the same plan..
    return Inertia::render('Plans/WordpressShow',[
        'plan' => $attempt->plan, // Updated to use $attempt->plan
    ]);
})->name('resume.subscription');