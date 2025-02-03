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

    function updateProfilePicture($path, $type) {
        $db_column = '';
        if($type == 'profile'){
            $db_column = 'photo';
        }else{
            $db_column = 'cover_photo';
        }
        return User::where('id', auth()->id())->update([
            $db_column => $path,
        ]);

    }

}
