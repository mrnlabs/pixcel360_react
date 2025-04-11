<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $table = 'devices';
    protected $fillable = ['device_name', 'device_id'];

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }
}
