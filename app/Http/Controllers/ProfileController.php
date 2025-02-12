<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\ProfileService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    protected ProfileService $profileService;

    public function __construct(ProfileService $profileService){
        $this->profileService = $profileService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user =  $this->profileService->getProfile();
        return Inertia::render('Profile/Index' , 
        ['user' => $user
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function updatePicture(Request $request)
    {
       $request->validate([
              'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048'
       ]);
       try {
        $filePath = Storage::put('logos', $request->file('photo'));
        $url = Storage::url($filePath);

        $this->profileService->updateProfilePicture($url);
        return back()->with('success', 'Profile picture updated successfully!');
       } catch (\Throwable $th) {
        throw $th;
       }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProfileUpdateRequest $request)
    {
        try {
            $user = $request->user();
            $user->fill($request->validated());
            $request->user()->email_verified_at = null;
             Auth::user()->save();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function removePicture()
    {
        $this->profileService->removeProfilePicture();
    }
}
