<?php

use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;


     Route::middleware('auth')->prefix('notifications')->group(function () {
            Route::get('/', [NotificationController::class, 'index'])->name('notifications.index');
            Route::get('/all', [NotificationController::class, 'viewAllNotifications'])->name('notifications.viewAll');
            Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.markAsRead');
            Route::post('/mark-all-as-read', [NotificationController::class, 'markAllAsRead'])->name('notifications.markAllAsRead');
            Route::post('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead'])->name('notifications.markAllAsRead');
    });


