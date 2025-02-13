<?php

use App\Http\Controllers\Plans\PlanController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('plans')->group(function () {
  Route::get('/', [PlanController::class, 'index'])->name('plans');
  Route::get('/create', [PlanController::class, 'create'])->name('plans.create');
});