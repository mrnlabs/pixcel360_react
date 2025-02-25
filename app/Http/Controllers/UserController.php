<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    function index() {
        return Inertia::render('Users/Index');
    }
}
