<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VideoUploadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'video' => [
                'required',
                'file',
                'mimes:mp4,mov,avi,wmv',
                'mimetypes:video/mp4,video/quicktime,video/x-msvideo,video/x-ms-wmv',
                'max:512000',  // Maximum file size in kilobytes (500MB)
            ],
            'slug' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'video.required' => 'Please select a video file to upload.',
            'video.file' => 'The uploaded file must be a valid video file.',
            'video.mimes' => 'Only MP4, MOV, AVI, and WMV video formats are allowed.',
            'video.max' => 'The video file size must not exceed 100MB.',
        ];
    }
}
