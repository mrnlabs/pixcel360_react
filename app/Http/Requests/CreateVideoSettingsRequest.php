<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateVideoSettingsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'motion_trigger' => 'nullable|string',
            'mirror_overlay' => 'nullable|string',
            'front_or_rear_camera' => 'nullable|string',
            'camera_exposure_menu_item' => 'nullable|string',
            'qr_app_protection' => 'nullable|string',
            'boomerang' => 'nullable|string',
            'animated_gif' => 'nullable|string',
            'videos' => 'nullable|string',
            'slomo' => 'nullable|string',
            'boomerang_repeats' => 'nullable|string',
            'boomerang_speed' => 'nullable|string',
            'boomerang_bounce' => 'nullable|string',
            'duration' => 'nullable|string',
            'gif_number_of_photos' => 'nullable|string',
            'gif_frame_duration' => 'nullable|string',
            'video_maximum_duration' => 'nullable|string',
            'slomo_recording_time' => 'nullable|string',
            'slomo_boomerang' => 'nullable|string',
            'speed' => 'nullable|string',
            'add_audio_file' => 'nullable|string',
            'screen_flash' => 'nullable|string',
            'time_outs' => 'nullable|string',
            'editing' => 'nullable|string',
            'sharing' => 'nullable|string',
        ];
    }

}
