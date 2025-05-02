<?php

namespace App\Mail;

use App\Models\User;
use App\Models\PaymentAttempt;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class CartAbandonment extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $attempt;

    public function __construct(User $user, PaymentAttempt $attempt)
    {
        $this->user = $user;
        $this->attempt = $attempt;
    }

   
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Forgot something? Your Pixcel360 subscription is waiting",
            from: new Address(env('MAIL_FROM_ADDRESS'), 'Photo Booth')
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $resumeUrl = route('resume.subscription', [
            'identifier' => $this->attempt->identifier
        ]);

        return new Content(
            view: 'emails.payments.cart-abandonment',
            with: [
                'firstName' => $this->user->firstname ?? 'there',
                'resumeUrl' => $resumeUrl
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