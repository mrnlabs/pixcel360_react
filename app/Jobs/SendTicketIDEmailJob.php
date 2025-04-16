<?php

namespace App\Jobs;

use App\Mail\SendTicketIDMail;
use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SendTicketIDEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $issue;
    protected $email;
    protected $fullname;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;

    /**
     * Create a new job instance.
     */
    public function __construct($issue, $email, $fullname)
    {
        $this->issue = $issue;
        $this->email = $email;
        $this->fullname = $fullname;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            Mail::to($this->email,$this->fullname)->send(new SendTicketIDMail($this->issue,$this->fullname));
            
            // Log successful email sending
            Log::info("TicketID email sent successfully to: {$this->email} for : {$this->fullname}");
        } catch (\Exception $e) {
            Log::error("Failed to send TicketID email to {$this->email}: " . $e->getMessage());
            throw $e;
        }
    }
}