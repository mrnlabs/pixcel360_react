<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SharingSubject extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $guarded = [];

    public function event(){
        return $this->belongsTo(Event::class);
    }

}
