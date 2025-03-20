<?php

namespace App\Http\Controllers\Auth;

use Exception;
use Throwable;
use App\Models\User;
use Inertia\Inertia;
use App\Mail\WelcomeEmail;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Notifications\NewUserRegistered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Laravel\Socialite\Facades\Socialite;
use Spatie\Permission\Models\Permission;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return response()->json([
            'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl()
        ]);
    }



    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            $plainPassword = Str::random(8);

// First check if user exists with this Google ID
$user = User::where('google_id', $googleUser->id)->first();

// If not found by Google ID, try to find by email
if (!$user) {
    $user = User::where('email', $googleUser->email)->first();
    
    // If user found by email, update their Google ID
    if ($user) {
        $user->update([
            'google_id' => $googleUser->id,
            'photo' => $googleUser->avatar,
            'last_login_at' => now(),
        ]);
    }
}

// If user still not found, create a new one
if (!$user) {
    $user = User::create([
        'firstname' => explode(' ', $googleUser->name)[0], 
        'lastname' => isset($googleUser->name) ? implode(' ', array_slice(explode(' ', $googleUser->name), 1)) : '',
        'email' => $googleUser->email,
        'google_id' => $googleUser->id,
        'photo' => $googleUser->avatar,
        'last_login_at' => now(),
        'password' => Hash::make($plainPassword)
    ]);
    Mail::to($user->email)->send(new WelcomeEmail($user, $plainPassword));
}
            if($user->wasRecentlyCreated) {
                $user->assignRole('Account Owner');
                $permissions = Permission::all();
                $user->syncPermissions($permissions);
                $admins = User::getSystemAdmins();
        
                foreach($admins as $admin) {
                    $admin->notify(new NewUserRegistered($user));
                }

                
            }

            Auth::login($user);

            return Inertia::location(route('dashboard', absolute: false));

        } catch (Throwable $th) {
            throw $th;
            // return redirect()->route('login')->with('error', 'Something went wrong!');
        }
    }
}