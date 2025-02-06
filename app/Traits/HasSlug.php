<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasSlug
{
    protected static function bootHasSlug()
    {
        static::creating(function ($model) {
            if (empty($model->slug)) {
                $model->slug = self::generateUniqueSlug($model);
            }
        });
    }

    protected static function generateUniqueSlug($model)
    {
        do {
            $slug = Str::uuid()->toString();
        } while ($model->where('slug', $slug)->exists());

        return $slug;
    }
}
