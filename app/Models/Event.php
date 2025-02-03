<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;


    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function videos(){
        return $this->hasMany(Video::class);
    }

    public function videoSettings(){
        return $this->hasOne(VideoSetting::class);
    }

    public function sharingSettings(){
        return $this->hasOne(SharingSetting::class);
    }

 

}

