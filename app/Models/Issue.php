<?php

namespace App\Models;

use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    use HasFactory, HasSlug;
    
    protected $fillable = [
        'title', 'description', 'user_id', 'category_id', 
        'status', 'priority', 'browser', 'os', 'url', 'screenshots'
    ];

    protected $casts = [
        'screenshots' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(IssueCategory::class);
    }
}
