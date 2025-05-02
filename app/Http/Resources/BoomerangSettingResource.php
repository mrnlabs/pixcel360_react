<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BoomerangSettingResource extends JsonResource
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
            'motion_trigger' => $this->motion_trigger,
            'boomerang' => $this->boomerang,
            'animated_gif' => $this->animated_gif,
            'videos' => $this->videos,
            'duration' => $this->duration ?? "2",
            'slomo' => $this->slomo,
            'boomerang_repeats' => $this->boomerang_repeats,
            'boomerang_speed' => $this->boomerang_speed,
            'boomerang_bounce' => $this->boomerang_bounce,
            'stabilization' => $this->stabilization,
            'props' => $this->props,
            'thanks' => $this->thanks,
            'gif_number_of_photos' => $this->gif_number_of_photos,
            'gif_frame_duration' => $this->gif_frame_duration,
            'video_maximum_duration' => $this->video_maximum_duration,
            'slomo_recording_time' => $this->slomo_recording_time ?? 2,
            'slomo_boomerang' => $this->slomo_boomerang,
            'speed' => $this->speed,
            'add_audio_file' => $this->add_audio_file,
            'screen_flash' => $this->screen_flash,
            'time_outs' => $this->time_outs,
            'editing' => $this->editing,
            'sharing' => $this->sharing,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}