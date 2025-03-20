<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Gallery\GalleryController;

Route::middleware('auth')->prefix('events')->group(function () {
    Route::get('/gallery/{slug}', [GalleryController::class, 'index'])->name('gallery');
    Route::delete('/gallery/{id}', [GalleryController::class, 'delete_video'])->name('delete_video');
});