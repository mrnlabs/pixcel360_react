<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
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
            "firstname" => "required| string|min:3, max:255",
            "lastname" => "required| string|min:3, max:255",
            "email" => "required|email|unique:users,email",
            // "phone" => "required|unique:users,phone",
            "password" => "required|min:6, max:255, confirmed",
        ];
    }
}
