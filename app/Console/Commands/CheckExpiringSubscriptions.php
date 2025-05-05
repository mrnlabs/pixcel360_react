<?php

namespace App\Console\Commands;

use App\Jobs\SendSubscriptionReminderJob;
use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CheckExpiringSubscriptions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'subscriptions:check-expiring';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for subscriptions that are expiring soon and queue reminder emails';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Find subscriptions expiring in 2 days
        $twoDaysFromNow = Carbon::now()->addDays(2)->toDateString();
        $subscriptionsExpiringInTwoDays = Subscription::with('plan')
        ->whereDate('expires_at', $twoDaysFromNow)
            ->where('reminder_sent_2_days', false)
            ->with('user')
            ->get();

        $this->info('Found '.$subscriptionsExpiringInTwoDays->count().' subscriptions expiring in 2 days');

        foreach ($subscriptionsExpiringInTwoDays as $subscription) {
            SendSubscriptionReminderJob::dispatch($subscription, 2)
                ->onQueue('reminders');
            
            // Mark as sent
            $subscription->reminder_sent_2_days = true;
            $subscription->save();
            
            $this->info("2-day reminder queued for subscription #{$subscription->id}");
        }

        // Find subscriptions expiring tomorrow
        $tomorrow = Carbon::now()->addDay()->toDateString();
        $subscriptionsExpiringTomorrow = Subscription::with('plan')
        ->whereDate('expires_at', $tomorrow)
            ->where('reminder_sent_1_day', false)
            ->with('user')
            ->get();
            // dd($tomorrow);

        foreach ($subscriptionsExpiringTomorrow as $subscription) {
            SendSubscriptionReminderJob::dispatch($subscription, 1)
                ->onQueue('reminders');
            
            // Mark as sent
            $subscription->reminder_sent_1_day = true;
            $subscription->save();
            
            $this->info("1-day reminder queued for subscription #{$subscription->id}");
        }
        $this->info('Finished queuing expiring subscription reminders');
    }
}