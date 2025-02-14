<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlanRequest extends FormRequest
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
                 'name' => 'required',
                 'price' => 'required',
                 'price_per' => 'required|in:Month,Year,Week',
                 'category' => 'required|exists:plan_categories,id',
                 'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
                 'description' => 'required|string|min:20'
             ];
    }
}
