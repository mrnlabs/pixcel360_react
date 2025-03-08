<?php

namespace App\Models;

use App\Traits\HasSlug;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\DeletedModels\Models\Concerns\KeepsDeletedModels;

class Plan extends Model
{
    use HasFactory, HasSlug, KeepsDeletedModels;

    const INTERVAL_WEEKLY = 'week';
    const INTERVAL_MONTHLY = 'month';
    const INTERVAL_SEMI_ANNUAL = 'semi_annual';
    const INTERVAL_ANNUAL = 'year';

    protected $guarded = [];

    protected static function boot(){
        parent::boot();

    static::creating(function ($plan) {
        $plan->duration_in_days = match($plan->interval) {
            'week' => 7,
            'month' => 30,
            'semi_annual' => 180,
            'year' => 365,
            default => throw new \InvalidArgumentException("Invalid interval: {$plan->interval}")
        };
    });
}


    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    public function category()
    {
        return $this->belongsTo(PlanCategory::class);
    }

    public function getEndDate(Carbon $startDate = null): Carbon
{
    $startDate = $startDate ?? now();

    return match($this->interval) {
        self::INTERVAL_WEEKLY => $startDate->addWeek(),
        self::INTERVAL_MONTHLY => $startDate->addMonth(),
        self::INTERVAL_SEMI_ANNUAL => $startDate->addMonths(6),
        self::INTERVAL_ANNUAL => $startDate->addYear(),
    };
}

public function isWeekly(): bool
{
    return $this->interval === self::INTERVAL_WEEKLY;
}

public function isMonthly(): bool
{
    return $this->interval === self::INTERVAL_MONTHLY;
}

public function isSemiAnnual(): bool
{
    return $this->interval === self::INTERVAL_SEMI_ANNUAL;
}

public function isAnnual(): bool
{
    return $this->interval === self::INTERVAL_ANNUAL;
}

public function getIntervalInDays(): int
    {
        return match($this->interval) {
            self::INTERVAL_WEEKLY => 7,
            self::INTERVAL_MONTHLY => 30,
            self::INTERVAL_SEMI_ANNUAL => 180,
            self::INTERVAL_ANNUAL => 365,
        };
    }

}
