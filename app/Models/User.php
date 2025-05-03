<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Traits\HasSlug;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\DeletedModels\Models\Concerns\KeepsDeletedModels;

class User extends Authenticatable
{
    use HasApiTokens, HasSlug, HasFactory, KeepsDeletedModels, Notifiable, HasRoles;

    
    protected $guarded = [];

    protected $hidden = [
        'password',
        'remember_token',
    ];

   
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function hasActiveSubscription()
    {
        return $this->subscriptions()
            ->where('expires_at', '>', now())
            ->exists();
    }

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    public function currentSubscription()
{
    return $this->hasOne(Subscription::class)
        ->where('started_at', '<=', now())
        ->where('expires_at', '>', now())
        ->latest('started_at');
}

public function activeAndFutureSubscriptions()
{
    return $this->hasMany(Subscription::class)
        ->where(function ($query) {
            $query->where('expires_at', '>', now());
        })
        ->orderBy('started_at', 'asc');
}

// Get the next subscription that hasn't started yet
public function nextSubscription()
{
    return $this->hasOne(Subscription::class)
        ->where('started_at', '>', now())
        ->orderBy('started_at', 'asc');
}


    public static function getSystemAdmins()
    {
        return self::whereHas('roles', function($query) {
            $query->whereIn('name', ['System SuperAdmin', 'System Admin']);
        })->get();
    }

    public function overlays(): HasMany
    {
        return $this->hasMany(Overlay::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function activeEvents(): HasMany
    {
        return $this->hasMany(Event::class)
            ->where('status', 1);
    }

}
