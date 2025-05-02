<?php

namespace App\Console\Commands;

use App\Models\PaymentAttempt;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\CartAbandonment;

class SendAbandonmentEmails extends Command
{
    protected $signature = 'emails:cart-abandonment';
    protected $description = 'Send emails to users who abandoned their cart';

    public function handle()
    {
        $attempts = PaymentAttempt::abandoned()->get();
        
        $this->info("Found {$attempts->count()} abandoned carts");
        
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
            
            $this->info("Sent abandonment email to: {$user->email}");
        }
        
        return Command::SUCCESS;
    }
}