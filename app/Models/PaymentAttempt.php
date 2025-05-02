<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentAttempt extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'plan_id', 'order_id', 'identifier', 'amount', 'status', 'email_sent_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    // Scope for finding abandoned carts
    public function scopeOneHourAbandoned($query)
    {
        return $query->where('status', 'initiated')
            ->whereBetween('created_at', [
                now()->subMinutes(70), // 1 hour 10 minutes ago
                now()->subMinutes(50)  // 50 minutes ago
            ])
            ->whereNull('email_sent_at');
    }
    
    // Keep the original method for finding all abandoned carts
    public function scopeAbandoned($query)
    {
        return $query->where('status', 'initiated')
            ->where('created_at', '<=', now()->subHours(1))
            ->where('created_at', '>=', now()->subDays(3))
            ->whereNull('email_sent_at');
    }
    
    // Add additional scopes for staged reminders
    public function scopeOneDayAbandoned($query)
    {
        return $query->where('status', 'initiated')
            ->whereBetween('created_at', [
                now()->subHours(25), // 25 hours ago
                now()->subHours(23)  // 23 hours ago
            ])
            ->whereNotNull('email_sent_at')
            ->where('email_sent_at', '<=', now()->subHours(22));
    }
}
