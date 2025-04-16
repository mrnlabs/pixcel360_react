<?php

use App\Http\Controllers\IssueController;
use App\Http\Controllers\TermsAndConditionController;
use Illuminate\Support\Facades\Route;


     Route::middleware('auth')->prefix('issues')->group(function () {
            Route::get('/', [IssueController::class, 'index'])->name('issues.index');
            Route::get('/create', [IssueController::class, 'create'])->name('issues.create');
            Route::post('/', [IssueController::class, 'store'])->name('issues.store');
            Route::get('/{id}', [IssueController::class, 'show'])->name('issues.show');
            Route::post('/update-ticket', [IssueController::class, 'update'])->name('issues.update');
            Route::delete('/delete{slug}', [IssueController::class, 'destroy'])->name('issues.destroy');
    });


