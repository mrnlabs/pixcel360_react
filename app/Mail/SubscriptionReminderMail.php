<?php

namespace App\Mail;

use App\Models\User;
use App\Models\Subscription;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Contracts\Queue\ShouldQueue;

class SubscriptionReminderMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * The user instance.
     *
     * @var \App\Models\User
     */
    protected $user;

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
     * Create a new message instance.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Subscription  $subscription
     * @param  int  $daysUntilExpiration
     * @return void
     */
     public function __construct(User $user, Subscription $subscription, int $daysUntilExpiration)
    {
        $this->user = $user;
        $this->subscription = $subscription;
        $this->daysUntilExpiration = $daysUntilExpiration;
    }


    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        if ($this->daysUntilExpiration === 1) {
            $subject = 'FINAL REMINDER: Your Pixcel360 Subscription Expires Tomorrow ⏳';
        }else{
            $subject = 'Your Pixcel360 Subscription Expires in 7 Days ⏳';
        }

        return new Envelope(
            subject: $subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.payments.reminder',
            with: [
                'user' => $this->user,
                'subscription' => $this->subscription,
                'daysUntilExpiration' => $this->daysUntilExpiration,
                'expiryDate' => $this->subscription->expires_at->format('F j, Y'),
                'renewalLink' => route('subscription.renew', $this->subscription->id),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
