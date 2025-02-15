<?php

namespace App\Http\Controllers\Plans;

use App\Http\Controllers\Controller;
use App\Http\Requests\PlanRequest;
use App\Models\Plan;
use Stripe\Stripe;
use Stripe\Price;
use Stripe\Product;
use App\Models\PlanCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PlanController extends Controller
{
    function index() : Response
    {
        $plans = Plan::with('category')->latest()->get();
        return Inertia::render('Plans/Index',[
            'plans' => $plans
        ]);
    }

    function create() : Response
    {
        $planCategories = PlanCategory::all();
        return Inertia::render('Plans/Create',[
            'planCategories' => $planCategories
        ]);
    }

    function store(PlanRequest $request) {

        if ($request->file('photo')) {
            $filePath = Storage::put('plans', $request->file('photo'));
            $url = Storage::url($filePath);
            $plan = Plan::create([
                'name' => $request->name,
                'price' => $request->price,
                'price_per' => $request->price_per,
                'category_id' => $request->category,
                'photo' => $url,
                'description' => $request->description
            ]);
       }

        if($plan) {
            return back()->with('success', 'Plan created successfully');
        }
        return back()->with('error', 'Something went wrong');
    }

    function edit($slug) : Response
    {
        $plan = Plan::where('slug', $slug)->first();
        $planCategories = PlanCategory::all();
        return Inertia::render('Plans/Create',[
            'plan' => $plan,
            'planCategories' => $planCategories
        ]);
    }

    function update(PlanRequest $request, $slug) {
        
        $plan = Plan::where('slug', $slug)->first();
        if ($request->file('photo')) {
            $filePath = Storage::put('plans', $request->file('photo'));
            $url = Storage::url($filePath);
            $plan->update([
                'name' => $request->name,
                'price' => $request->price,
                'price_per' => $request->price_per,
                'category_id' => $request->category,
                'photo' => $url,
                'description' => $request->description
            ]);
        } else {
            $plan->update([
                'name' => $request->name,
                'price' => $request->price,
                'price_per' => $request->price_per,
                'category_id' => $request->category,
                'description' => $request->description
            ]);
        }

        if($plan) {
            return back()->with('success', 'Plan updated successfully');
        }
        return back()->with('error', 'Something went wrong');
    }

    function destroy(string $slug){
        $plan = Plan::where('slug', $slug)->first();
        $plan->delete();
        return back()->with('success', 'Plan deleted successfully');
    }
}