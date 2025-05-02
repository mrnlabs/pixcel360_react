<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SharingMethodResource extends JsonResource
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
            'email' => $this->email,
            'sms' => $this->sms,
            'download' => $this->download,
            'airdrop' => $this->airdrop,
            'qr' => $this->qr,
            'general' => $this->general,
            'whatsapp' => $this->whatsapp,
            'inappgallery' => $this->inappgallery,
        ];
    }
}