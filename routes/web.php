<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PricingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Gallery\GalleryController;
use App\Http\Controllers\Plans\PlanController;
use App\Http\Controllers\TermsAndConditionController;

Route::get('/clear-cache', function () {
    Artisan::call('optimize:clear');
    Artisan::call('storage:link');
    Artisan::call('config:clear');
    return "success";
});

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/login', function () {return Inertia::render('Auth/Login');});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


//event gallery
Route::get('/event-gallery/{id}', [EventController::class, 'gallery'])->name('event-gallery');
Route::get('/support/{id}', [TermsAndConditionController::class, 'support'])->name('support');

//profile
Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
Route::post('/profile', [ProfileController::class, 'update'])->name('update_profile');
Route::post('/update-profile-picture', [ProfileController::class, 'updatePicture'])->name('update_pro_pic');
Route::delete('/remove-profile-image', [ProfileController::class, 'removePicture'])->name('remove_pro_pic');

Route::get('/pricing', [PricingController::class, 'index'])->name('pricing');
Route::get('/add-to-cart', [PricingController::class, 'addToCart'])->name('addToCart');

Route::get('/checkout', [CheckoutController::class, 'checkout'])->name('checkout');

// This one is also viewable from wordpress side so keep it unprotected
Route::get('/plans/show/{slug}', [PlanController::class, 'show'])->name('plans.show');

// exclude this route from auth
// its for shared gallery link
Route::get('/shared-gallery/{slug}', [GalleryController::class, 'share_gallery'])->name('shared_gallery');



require __DIR__.'/auth.php';
require __DIR__.'/event.php';
require __DIR__.'/gallery.php';
require __DIR__.'/plan.php';
require __DIR__.'/subscription.php';
require __DIR__.'/payment_method.php';
require __DIR__.'/payfast.php';
require __DIR__.'/invoice.php';
require __DIR__.'/google_auth.php';
require __DIR__.'/user.php';
require __DIR__.'/notify.php';
require __DIR__.'/user_overlay.php';
require __DIR__.'/admin_overlay.php';
require __DIR__.'/t_and_cs.php';
require __DIR__.'/recycle.php';

