<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    function index() : \Inertia\Response
    {
        return \Inertia\Inertia::render('Welcome');
        
    }
}
