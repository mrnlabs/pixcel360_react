<?php

namespace App\Http\Controllers\Auth;

use Exception;
use Throwable;
use App\Models\User;
use Inertia\Inertia;
use App\Mail\WelcomeEmail;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
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
            // dd($googleUser);
            $plainPassword = Str::random(8);
            $user = User::updateOrCreate(
                ['google_id' => $googleUser->id],
                [
                    'firstname' => $googleUser->name,
                    'lastname' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'photo' => $googleUser->avatar,
                    'password' => Hash::make('password')
                ]
            );
            if($user->wasRecentlyCreated) {
                $user->assignRole('Account Owner');
                $permissions = Permission::all();
                $user->syncPermissions($permissions);

                Mail::to($user->email)->send(new WelcomeEmail($user, $plainPassword));
            }

            Auth::login($user);

            return Inertia::location(route('dashboard', absolute: false));

        } catch (Throwable $th) {
            throw $th;
            // return redirect()->route('login')->with('error', 'Something went wrong!');
        }
    }
}