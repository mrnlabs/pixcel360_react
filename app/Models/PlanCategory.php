<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlanCategory extends Model
{
   protected $fillable = ['name'];

    public function plans()
    {
        return $this->hasMany(Plan::class);
    }
}
