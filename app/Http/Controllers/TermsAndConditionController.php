<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TermsAndConditionController extends Controller
{
    function create(){
        return Inertia::render('');
    }

    function support($id){
        Auth::loginUsingId($id);
        return Inertia::location(route('dashboard', ['success' => 'Logged in success'], absolute: true));
    }
}
