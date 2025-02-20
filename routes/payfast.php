<?php

use App\Http\Controllers\PaymentGateWays\PayFastController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('subscriptions')->group(function () {

Route::get('/checkout/{slug}', [PayFastController::class, 'showCheckout'])->name('payment.checkout');
Route::get('payment/success', [PayFastController::class, 'success'])->name('payment.success');
Route::get('payment/cancel', [PayFastController::class, 'cancel'])->name('payment.cancel');
Route::post('payment/notify', [PayFastController::class, 'notify'])->name('payment.notify');
Route::post('payment/initiate', [PayFastController::class, 'initiatePayment']);
Route::post('payment/process', [PayFastController::class, 'processPayment']);

});