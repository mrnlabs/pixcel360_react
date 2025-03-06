<?php

namespace App\Models;

use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\DeletedModels\Models\Concerns\KeepsDeletedModels;

class Subscription extends Model
{
    use HasFactory, HasSlug,KeepsDeletedModels;

    protected $fillable = ['user_id', 'plan_id', 'started_at', 'expires_at', 'slug'];
    
    protected $casts = [
        'started_at' => 'datetime',
        'expires_at' => 'datetime',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }
}
