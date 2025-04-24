<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingResource extends JsonResource
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
            'count_down' => $this->count_down,
            'beep_sounds' => $this->beep_sounds,
            'flash' => $this->flash,
            'mirror_overlay' => $this->mirror_overlay,
            'front_rear_camera' => $this->front_rear_camera,
            'camera_exposure' => $this->camera_exposure,
            'qr_app_protection' => $this->qr_app_protection,
            'gallery_name' => $this->gallery_name,
            'gallery_contact' => $this->gallery_contact,
            'text_button_color' => $this->text_button_color,
            'attract_screen' => $this->attract_screen,
            'app_logo' => $this->app_logo,
            'app_background' => $this->app_background,
            'webgallery_background' => $this->webgallery_background,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}