<?php

// app/Jobs/SendGalleryShareEmail.php
namespace App\Jobs;

use App\Mail\GalleryShareMail;
use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SendGalleryShareEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $email;
    protected $event;
    protected $galleryLink;
    protected $logo;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;

    /**
     * Create a new job instance.
     */
    public function __construct(string $email, Event $event, string $galleryLink, $logo)
    {
        $this->email = $email;
        $this->event = $event;
        $this->galleryLink = $galleryLink;
        $this->logo = $logo;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            Mail::to($this->email)->send(new GalleryShareMail(
                $this->event,
                $this->galleryLink,
                $this->logo
            ));
            
            // Log successful email sending
            Log::info("Gallery share email sent successfully to: {$this->email} for event: {$this->event->id}");
        } catch (\Exception $e) {
            Log::error("Failed to send gallery share email to {$this->email}: " . $e->getMessage());
            throw $e;
        }
    }
}