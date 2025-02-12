<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Gallery\GalleryController;

Route::middleware('auth')->prefix('gallery')->group(function () {
Route::get('/{slug}', [GalleryController::class, 'index'])->name('gallery');
});