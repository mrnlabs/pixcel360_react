<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\DeletedModels\Models\Concerns\KeepsDeletedModels;

class Overlay extends Model
{
    use KeepsDeletedModels;
    protected $guarded = [];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }



    public function scopeAdmin($query)
    {
        return $query->where('is_admin', true);
    }

   
    public function scopeUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

   
    public function scopeAvailableTo($query, $userId)
    {
        return $query->where(function($query) use ($userId) {
            $query->where('is_admin', true)
                  ->orWhere('user_id', $userId);
        });
    }

    public function events()
{
    return $this->hasMany(Event::class);
}
}
