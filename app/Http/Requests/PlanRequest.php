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
        $isCreate = $this->route()->getName() == 'plans.store' ? 'required|image|mimes:jpeg,png,jpg|max:2048' : 'nullable|image|mimes:jpeg,png,jpg|max:2048';
    //    dd(request());
             return [
                 'name' => 'required',
                 'price' => 'required',
                 'interval' => 'required|in:month,year,week,semi_annual',
                //  'category' => 'required|exists:plan_categories,id',
                 'photo' => $isCreate,
                 'description' => 'required|string|min:20'
             ];
    }
}
