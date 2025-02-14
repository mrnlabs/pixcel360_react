<?php

use App\Http\Controllers\Plans\PlanController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('plans')->group(function () {
  Route::get('/', [PlanController::class, 'index'])->name('plans');
  Route::get('/create', [PlanController::class, 'create'])->name('plans.create');
  Route::post('/store', [PlanController::class, 'store'])->name('plans.store');
  Route::get('/edit/{slug}', [PlanController::class, 'edit'])->name('plans.edit');
  Route::post('/update/{slug}', [PlanController::class, 'update'])->name('plans.update');
  Route::delete('/delete/{id}', [PlanController::class, 'destroy'])->name('plans.destroy');
});