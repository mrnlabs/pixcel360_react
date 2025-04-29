<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;
    
    // protected $fillable = [
    //     'user_id',
    //     'plan_id',
    //     'payment_gateway',
    //     'transaction_id',
    //     'merchant_payment_id',
    //     'amount',
    //     'currency',
    //     'payment_status',
    //     'status',
    //     'payment_data',
    //     'completed_at',
    // ];
    protected $guarded = [];
    protected $casts = [
        'payment_data' => 'array',
        'completed_at' => 'datetime',
    ];

    /**
     * Get the user that owns the transaction.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the subscription plan associated with the transaction.
     */
    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    /**
     * Determine if the transaction was successful.
     */
    public function isSuccessful()
    {
        return $this->status === 'completed';
    }

    /**
     * Determine if the transaction is pending.
     */
    public function isPending()
    {
        return $this->status === 'pending';
    }

    /**
     * Determine if the transaction failed.
     */
    public function isFailed()
    {
        return $this->status === 'failed';
    }

    /**
     * Mark the transaction as completed.
     */
    public function markAsCompleted()
    {
        $this->update([
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        return $this;
    }

    /**
     * Mark the transaction as failed.
     */
    public function markAsFailed()
    {
        $this->update([
            'status' => 'failed',
        ]);

        return $this;
    }

    /**
     * Get the formatted amount with currency symbol.
     */
    public function getFormattedAmountAttribute()
    {
        if ($this->currency === 'ZAR') {
            return 'R ' . number_format($this->amount, 2);
        }
        
        return $this->currency . ' ' . number_format($this->amount, 2);
    }
}
