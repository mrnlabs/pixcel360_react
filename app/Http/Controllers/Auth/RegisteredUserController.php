<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CreateUserRequest;
use App\Mail\WelcomeEmail;
use App\Models\User;
use App\Notifications\NewUserRegistered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(CreateUserRequest $createUserRequest)
    {
        $createUserRequest->validated();
        $plainPassword = $createUserRequest->password;
        $user = User::create([
            'firstname' => $createUserRequest->firstname,
            'lastname' => $createUserRequest->lastname,
            'email' => $createUserRequest->email,
            'phone' => $createUserRequest->phone,
            'last_login_at' => now(),
            'password' => Hash::make($createUserRequest->password),
        ]);

        $user->assignRole('Account Owner');
        $permissions = Permission::all();
        $user->syncPermissions($permissions);
        
        $admins = User::getSystemAdmins();
        
        foreach($admins as $admin) {
            $admin->notify(new NewUserRegistered($user));
        }
        Mail::to($user->email)->send(new WelcomeEmail($user, $plainPassword));

        Auth::login($user);

        return Inertia::location(route('dashboard', ['success' => 'Account created successfully'], absolute: false));
    }
}
