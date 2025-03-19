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
            'start_date' => request('enable_start_end_date') == 1 ? [
                'required',
                'date',
                function ($attribute, $value, $fail) {
                    // Check if the start date is in the past
                    if (strtotime($value) < strtotime(now()->toDateTimeString())) {
                        $fail('The start date cannot be in the past.');
                    }
                },
            ]: '',
            'end_date' => request('enable_start_end_date') == 1 ? [
                'required',
                'date',
                function ($attribute, $value, $fail) {
                    // Check if the end date is later than the start date
                    if (isset($this->start_date) && strtotime($value) <= strtotime($this->start_date)) {
                        $fail('The end date must be later than the start date.');
                    }
                },
            ]: '',
            'language' => 'required|string',
            'country' => 'required|string',
            'enable_start_end_date' => 'required',
            'terms_and_conditions' => 'required',
        ];
    }
}
