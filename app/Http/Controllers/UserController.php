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
        
        $query = User::query();
        
        // Handle search
        if(request()->has('search')) {
            $query->where('firstname', 'like', '%'.request('search').'%')
                ->orWhere('email', 'like', '%'.request('search').'%')
                ->orWhere('lastname', 'like', '%'.request('search').'%');
        }
        
        // Handle sorting
        if(request()->has('sort')) {
            $sortDirection = request('sort') === 'oldest' ? 'asc' : 'desc';
            $query->orderBy('created_at', $sortDirection);
        } else {
            // Default sorting if no sort parameter is provided
            $query->orderBy('created_at', 'desc');
        }
        
        $users = $query->paginate(10);
        
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

    function destroy($slug) {
        
        if(!isInternalPortalUser()) { abort(403); }
        
        $user = User::where('slug', $slug)->first();
        $user->delete();
        return redirect()->route('users');
    }
}
