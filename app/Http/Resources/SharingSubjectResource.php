<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SharingSubjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'event_id' => $this->event_id,
            'email_subject' => $this->email_subject,
            'default_text_email' => $this->default_text_email,
            'text_message' => $this->text_message,
            'webgallery_email_subject' => $this->webgallery_email_subject,
            'webgallery_email_message' => $this->webgallery_email_message,
            'social_share_description' => $this->social_share_description,
        ];
    }
}