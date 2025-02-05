<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'password' => ['required', Password::defaults()],
            'password_confirmation' => ['required', 'same:password'],
        ]);
    
        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);
    
        if($request->logoutOtherDevices){
            Auth::logoutOtherDevices($validated['password']);
        }
        
        return back()->with('status', 'Password updated successfully! Other devices have been logged out.');
    }
}
