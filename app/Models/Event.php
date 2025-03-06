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

    public function sharing_subject(){
        return $this->hasOne(SharingSubject::class, 'event_id', 'id');
    }
    public function setting()
    {
        return $this->hasOne(EventSetting::class, 'event_id', 'id');
    }
    public function sharing_method()
    {
        return $this->hasOne(SharingMethod::class, 'event_id', 'id');
    }
 
    public function overlay()
{
    return $this->belongsTo(Overlay::class);
}

}

