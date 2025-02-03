<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Plan;
use App\Models\User;

class CartService
{

    public  function  addToCart(){
        // Cart::create([
        //     'user_id' => auth()->id(),
        //     'plan_id' => request('id'),
        // ]);
        return Plan::find(request('id'));
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
