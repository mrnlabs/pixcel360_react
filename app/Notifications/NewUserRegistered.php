<?php
namespace App\Notifications;

use Illuminate\Notifications\Notification;

class NewUserRegistered extends Notification
{
    protected $newUser;

    public function __construct($user)
    {
        $this->newUser = $user;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'title' => 'New User Registration',
            'message' => "{$this->newUser->firstname} {$this->newUser->lastname} has registered.",
            'user_id' => $this->newUser->id,
            'model_route' => 'users.show',
            'model_slug' => $this->newUser->slug,
            'type' => 'new_registration'
        ];
    }
}