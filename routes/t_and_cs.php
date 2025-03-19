<?php

use App\Http\Controllers\TermsAndConditionController;
use Illuminate\Support\Facades\Route;


     Route::middleware('auth')->prefix('terms-and-conditions')->group(function () {
            //Route::get('/', [TermsAndConditionController::class, 'create'])->name('t_and_c.create');
    });


