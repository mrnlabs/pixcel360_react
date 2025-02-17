<?php

use App\Http\Controllers\PaymentMethods\PaymentMethodController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('payment-methods')->group(function () {
    Route::get('/', [PaymentMethodController::class, 'index'])->name('payment-methods.index');
    Route::post('/payment-methods', [PaymentMethodController::class, 'store'])->name('payment-methods.store');
    Route::delete('/payment-methods/{paymentMethod}', [PaymentMethodController::class, 'destroy'])->name('payment-methods.destroy');
    Route::post('/payment-methods/default', [PaymentMethodController::class, 'markDefault'])->name('payment-methods.default');
});