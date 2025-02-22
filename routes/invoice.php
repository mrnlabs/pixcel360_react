<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InvoiceController;

Route::middleware('auth')->prefix('invoices')->group(function () {
Route::get('/{slug}', [InvoiceController::class, 'generateInvoice'])->name('invoice.generate');
});