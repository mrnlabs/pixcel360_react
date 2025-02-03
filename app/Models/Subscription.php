<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    public function plan()
    {
        return $this->hasOne(Plan::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
