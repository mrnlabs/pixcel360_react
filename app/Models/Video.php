<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'is_processed' => 'boolean',
        'processing_failed' => 'boolean',
        'processed_at' => 'datetime',
        'size' => 'integer',
    ];

    public function event(){

        return $this->belongsTo(Event::class);
    }

    /**
     * Determine if the video has been processed.
     *
     * @return bool
     */
    public function isProcessed()
    {
        return $this->is_processed;
    }
}
