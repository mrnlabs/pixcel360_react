<?php

namespace App\Jobs;

use App\Mail\SubscriptionReminderMail;
use App\Models\Subscription;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendSubscriptionReminderJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The subscription instance.
     *
     * @var \App\Models\Subscription
     */
    protected $subscription;

    /**
     * The days until expiration.
     *
     * @var int
     */
    protected $daysUntilExpiration;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;

    /**
     * Create a new job instance.
     *
     * @param  \App\Models\Subscription  $subscription
     * @param  int  $daysUntilExpiration
     * @return void
     */
    public function __construct(Subscription $subscription, int $daysUntilExpiration)
    {
        $this->subscription = $subscription;
        $this->daysUntilExpiration = $daysUntilExpiration;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $user = $this->subscription->user;
        
        if (!$user || !$user->email) {
            Log::warning("Cannot send subscription reminder: User not found or has no email for subscription #{$this->subscription->id}");
            return;
        }

        try {
            Mail::to($user)->send(new SubscriptionReminderMail(
                $user,
                $this->subscription,
                $this->daysUntilExpiration
            ));

            Log::info("Subscription reminder sent to {$user->email} for subscription expiring in {$this->daysUntilExpiration} days");
        } catch (\Exception $e) {
            Log::error("Failed to send subscription reminder: {$e->getMessage()}");
            throw $e; // Re-throw to trigger the job to be retried
        }
    }

    /**
     * Get the middleware the job should pass through.
     *
     * @return array
     */
    public function middleware()
    {
        return [
            new \Illuminate\Queue\Middleware\RateLimited('emails')
        ];
    }
}