<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateSharingSettingsRequest extends FormRequest
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
            'thanks_message' => 'required|string',
            'props' => 'required|string',
            'sharing_method' => 'required|string',
            'edit_active' => 'required|boolean',
            'in_app_active' => 'required|boolean',
            'gallery' => 'required|boolean',
            'email_subject' => 'required|string',
            'text_email' => 'required|string',
            'text_message' => 'required|string',
            'webgallery_email_subject' => 'required|string',
            'webgallery_email_message' => 'required|string',
            'social_share_description' => 'required|string',
        ];
    }

}
