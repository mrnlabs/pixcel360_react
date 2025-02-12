<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PayfastController;
use App\Http\Controllers\PricingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\SubscriptionController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/login', function () {return Inertia::render('Auth/Login');});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
//event gallery
Route::get('/event-gallery/{id}', [EventController::class, 'gallery'])->name('event-gallery');

//profile
Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
Route::post('/profile', [ProfileController::class, 'update'])->name('update_profile');
Route::post('/update-profile-picture', [ProfileController::class, 'updatePicture'])->name('update_pro_pic');
Route::delete('/remove-profile-image', [ProfileController::class, 'removePicture'])->name('remove_pro_pic');

//subscriptions
Route::get('/subscriptions', [SubscriptionController::class, 'index'])->name('subscriptions');
Route::get('/view-subscription', [SubscriptionController::class, 'show']);


//plans
Route::get('/plans', [PlanController::class, 'index'])->name('plans');
Route::post('/create-plan', [PlanController::class, 'store'])->name('create_plan');

Route::get('/invoice', function () {
    return Inertia::render('Invoices/Invoice');
});
Route::get('/test', function () {
    return Inertia::render('Events/CreateEvent_old');
});




Route::get('/pricing', [PricingController::class, 'index'])->name('pricing');
Route::get('/add-to-cart', [PricingController::class, 'addToCart'])->name('addToCart');

Route::get('/checkout', [CheckoutController::class, 'checkout'])->name('checkout');

Route::post('/place-order', [PayfastController::class, 'initiate'])->name('initiate');
Route::get('/return', [PayfastController::class, 'return'])->name('return');
Route::get('/cancel', [PayfastController::class, 'cancel'])->name('cancel');
Route::post('/notify', [PayfastController::class, 'notify'])->name('notify');

require __DIR__.'/auth.php';
require __DIR__.'/event.php';
require __DIR__.'/gallery.php';
