<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\ProfileService;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        $profile =  $this->profileService->getProfile();
        $isMyProfile = request('id') ?  false : true;
        return Inertia::render('Profile/Edit' , 
        ['profile' => $profile,
        'isMyProfile' => $isMyProfile
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
    public function updatePicture(Request $request, string $type)
    {
        //store file and save url
       try {
        $path = $request->file('image')->storeAs('/avatars', $request->file('image')->getClientOriginalName(), 'public');
        $this->profileService->updateProfilePicture($path, $type);
        return back()->with('success', 'Profile picture updated successfully!');
       } catch (\Throwable $th) {
        throw $th;
       }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        try {
            User::find($request->id)->update($request->all());
            return back()->with('success', 'Profile updated successfully!');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
