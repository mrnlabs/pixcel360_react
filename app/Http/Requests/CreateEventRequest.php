<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateEventRequest extends FormRequest
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
            'name' => 'required|string|min:3|max:255',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'language' => 'required|string',
            'country' => 'required|string',
        ];
    }
}
