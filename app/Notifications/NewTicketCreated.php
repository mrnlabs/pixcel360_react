<?php
namespace App\Notifications;

use Illuminate\Notifications\Notification;

class NewTicketCreated extends Notification
{
    protected $issue;

    public function __construct($issue)
    {
        $this->issue = $issue;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'title' => 'New ticket lodged',
            'message' => auth()->user()->firstname. ' '.auth()->user()->lastname." has lodged a new ticket.",
            'user_id' => auth()->id(),
            'model_route' => 'issues.show',
            'model_slug' => $this->issue->slug,
            'type' => 'tickets'
        ];
    }
}