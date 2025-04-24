<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
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
            'user_id' => $this->user_id,
            'overlay_id' => $this->overlay_id,
            'name' => $this->name,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'description' => $this->description,
            'language' => $this->language,
            'country' => $this->country,
            'status' => $this->status,
            'terms_and_conditions' => $this->terms_and_conditions,
            'enable_start_end_date' => $this->enable_start_end_date,
            'slug' => $this->slug,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'setting' => new SettingResource($this->whenLoaded('setting')),
            'boomerang_setting' => new BoomerangSettingResource($this->whenLoaded('boomerang_setting')),
            'sharing_method' => new SharingMethodResource($this->whenLoaded('sharing_method')),
            'sharing_subject' => new SharingSubjectResource($this->whenLoaded('sharing_subject')),
        ];
    }
}