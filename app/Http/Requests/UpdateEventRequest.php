<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string',
            'language' => 'sometimes|required|string',
            'country' => 'sometimes|required|string',
            'countdown' => 'sometimes|required|date',
            'beep_sounds' => 'sometimes|required|string',
            'face_props' => 'sometimes|required|string',
            'gallery_name' => 'sometimes|required|string',
            'attract_screen' => 'sometimes|required|string',
            'app_logo' => 'sometimes|required|string',
            'app_background' => 'sometimes|required|string',
            'webgallery_background' => 'sometimes|required|string',
        ];
    }
}
