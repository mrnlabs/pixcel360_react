<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    function index() {
        // if not internal portal user abort 
        if(!isInternalPortalUser()) {
            abort(403);
        }
        if(request()->has('search')) {
            $users = User::where('firstname', 'like', '%'.request('search').'%')
                ->orWhere('email', 'like', '%'.request('search').'%')
                ->orWhere('lastname', 'like', '%'.request('search').'%')
                ->paginate(10);
        } else {
            $users = User::paginate(10);
        }
        // dd($users);
        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    function show($slug) {
        if(!isInternalPortalUser()) {
            abort(403);
        }
        
        $user = User::where('slug', $slug)->first();
        return Inertia::render('Users/Show', [
            'user' => $user,
        ]);
    }
}
