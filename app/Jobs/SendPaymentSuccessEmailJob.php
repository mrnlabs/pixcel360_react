<?php

namespace App\Jobs;

use App\Mail\PaymentSuccessMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendPaymentSuccessEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;
    protected $subscription;
    protected $email;
    protected $plan;

    /**
     * Create a new job instance.
     *
     * @param array $user
     * @param array $subscription
     * @param string $email
     * @return void
     */
    public function __construct($user, $subscription, $email, $plan = null)
    {
        $this->user = $user;
        $this->subscription = $subscription;
        $this->email = $email;
        $this->plan = $plan;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->email)
            ->send(new PaymentSuccessMail($this->user, $this->subscription, $this->plan));
    }
}