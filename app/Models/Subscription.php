<?php

namespace App\Models;

use App\Traits\HasSlug;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\DeletedModels\Models\Concerns\KeepsDeletedModels;

class Subscription extends Model
{
    use HasFactory, HasSlug,KeepsDeletedModels;

    protected $guarded = [];
    
   protected $casts = [
    //     'started_at' => 'datetime',
    //     'expires_at' => 'datetime',
           'price' => 'decimal:2',
          'reminder_sent_2_days' => 'boolean',
          'reminder_sent_1_day' => 'boolean',

   ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active')
                     ->where('expires_at', '>=', now());
    }

    /**
     * Determine if the subscription is active.
     *
     * @return bool
     */
    public function isActive()
    {
        if (!$this->expires_at instanceof Carbon) {
            $date = Carbon::parse($this->expires_at);
        }
        return $this->status === 'active' && $date->isFuture();
    }

    /**
     * Determine if the subscription has expired.
     *
     * @return bool
     */
    public function hasExpired()
    {
        if (!$this->expires_at instanceof Carbon) {
            $date = Carbon::parse($this->expires_at);
        }
        return $date->isPast();
    }

    /**
     * Determine if the subscription is expiring soon (within 7 days).
     *
     * @return bool
     */
    public function isExpiringSoon()
    {
        if (!$this->expires_at instanceof Carbon) {
            $date = Carbon::parse($this->expires_at);
        }
        return $this->isActive() && $date->diffInDays(now()) <= 7;
    }

    public function devices(){
        return $this->hasMany(Device::class);
    }
}
