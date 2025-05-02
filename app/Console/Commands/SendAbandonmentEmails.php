<?php

namespace App\Console\Commands;

use App\Models\PaymentAttempt;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\CartAbandonment;

class SendAbandonmentEmails extends Command
{
    protected $signature = 'emails:cart-abandonment {--all : Send to all eligible abandoned carts} {--hour : Send 1-hour reminders} {--day : Send 1-day follow-ups}';
    protected $description = 'Send emails to users who abandoned their cart';

    public function handle()
    {
        if ($this->option('all')) {
            $this->sendAllReminders();
        } elseif ($this->option('hour')) {
            $this->sendOneHourReminders();
        } elseif ($this->option('day')) {
            $this->sendOneDayReminders();
        } else {
            // Default to 1-hour reminders if no option specified
            $this->sendOneHourReminders();
        }
        
        return Command::SUCCESS;
    }
    
    protected function sendOneHourReminders()
    {
        $attempts = PaymentAttempt::oneHourAbandoned()->get();
        // dd($attempts);
        $this->info("Found {$attempts->count()} 1-hour abandoned carts");
        
        foreach ($attempts as $attempt) {
            $user = $attempt->user;
            
            // Skip if user doesn't exist or has no email
            if (!$user || !$user->email) {
                continue;
            }
            
            // Send email
            Mail::to($user->email)->send(new CartAbandonment($user, $attempt));
            
            // Update status
            $attempt->email_sent_at = now();
            $attempt->save();
            
            $this->info("Sent 1-hour abandonment email to: {$user->email}");
        }
    }
    
    protected function sendOneDayReminders()
    {
        $attempts = PaymentAttempt::oneDayAbandoned()->get();
        
        $this->info("Found {$attempts->count()} 1-day abandoned carts");
        
        foreach ($attempts as $attempt) {
            $user = $attempt->user;
            
            // Skip if user doesn't exist or has no email
            if (!$user || !$user->email) {
                continue;
            }
            
            // Send follow-up email
            Mail::to($user->email)->send(new CartAbandonment($user, $attempt));
            
            // Update status
            $attempt->email_sent_at = now();
            $attempt->save();
            
            $this->info("Sent 1-day follow-up email to: {$user->email}");
        }
    }
    
    protected function sendAllReminders()
    {
        $this->sendOneHourReminders();
        $this->sendOneDayReminders();
    }
}