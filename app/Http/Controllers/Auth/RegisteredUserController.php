<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CreateUserRequest;
use App\Mail\WelcomeEmail;
use App\Models\User;
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
            'password' => Hash::make($createUserRequest->password),
        ]);

        $user->assignRole('Account Owner');
        $permissions = Permission::all();
        $user->syncPermissions($permissions);

        // event(new Registered($user));
         // Send welcome email
        Mail::to($user->email)->send(new WelcomeEmail($user, $plainPassword));

        Auth::login($user);

        return Inertia::location(route('dashboard', absolute: false));

        // return redirect(route('dashboard', absolute: false));
    }
}
