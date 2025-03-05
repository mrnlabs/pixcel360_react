<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

use App\Notifications\NewUserRegistered;
use Spatie\Permission\Models\Permission;

class WordpressUserController extends Controller
{
    
    public function registerWordPressUser(Request $request)
    {
       try{
        $validatedData = $this->validateUserData($request);
        $user = $this->createUserInWordPress($validatedData);
        return response()->json(['status' => 'success', 'user' => $user]);
       } catch (\Exception $e) {
        Log::error($e->getMessage());
        return response()->json(['error' => 'An error occurred while registering the user.'], 500);
       }
      
    }

    private function validateUserData($request)
    {
        $request->validate([
            "email" => "required|email|unique:users,email",
            'password' => 'required'
        ]);

        $validatedData = $request->only(['email', 'password']);
        return $validatedData;
    }

    private function createUserInWordPress($data)
    {

        $user = User::create([
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'firstname' => $data['firstname'] ?? explode('@', $data['email'])[0],
            'lastname' => $data['lastname'] ?? explode('@', $data['email'])[0].Str::random(5),
        ]);

        $user->assignRole('Account Owner');
        $permissions = Permission::all();
        $user->syncPermissions($permissions);
        
        $admins = User::getSystemAdmins();
        
        foreach($admins as $admin) {
            $admin->notify(new NewUserRegistered($user));
        }
        //$plainPassword = $data['password']; // Added this line to define $plainPassword
        //Mail::to($user->email)->queue(new WelcomeEmail($user, $plainPassword));

        Auth::login($user);
        return $user;
    }
}