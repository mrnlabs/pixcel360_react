<?php

namespace App\Models;

use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\DeletedModels\Models\Concerns\KeepsDeletedModels;

class Event extends Model
{
    use HasFactory,HasSlug,KeepsDeletedModels;


    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function videos(){
        return $this->hasMany(Video::class);
    }

    public function boomerang_setting(){
        return $this->hasOne(VideoSetting::class, 'event_id', 'id');
    }

    public function sharingSettings(){
        return $this->hasOne(SharingSetting::class);
    }
    public function setting()
    {
        return $this->hasOne(EventSetting::class);
    }
 

}

