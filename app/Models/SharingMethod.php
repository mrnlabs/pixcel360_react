<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SharingMethod extends Model
{
    protected $guarded = [];


    function event(): BelongsTo {
        return $this->belongsTo(Event::class);
    }
}
