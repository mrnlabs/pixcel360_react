<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Gallery\GalleryController;
use App\Http\Controllers\Gallery\GalleryShareController;

Route::prefix('events')->group(function () {
    Route::get('/gallery/{slug}', [GalleryController::class, 'index'])->name('gallery');
    Route::delete('/gallery', [GalleryController::class, 'delete_videos'])->name('delete_videos');
    Route::post('/share-gallery-via-email', [GalleryShareController::class, 'shareGallery'])->name('share_gallery_via_email');
    Route::post('/share-video-via-email', [GalleryShareController::class, 'shareSingleVideoGallery'])->name('share_single_video_gallery_via_email');
});