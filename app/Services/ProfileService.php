<?php

namespace App\Services;

use App\Models\User;

class ProfileService
{

    public  function  getProfile(){
        if(request('id')){
            return User::find(request('id'));
        }
        return auth()->user();
    }

    function updateProfilePicture($path) {
        return User::where('id', auth()->id())->update([
            'photo' => $path,
        ]);
    }

    function removeProfilePicture() {
        auth()->user()->update([
            'photo' => null
        ]);
        return true;
    }

}
