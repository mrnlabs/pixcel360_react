<?php

namespace App\Http\Controllers\Plans;

use App\Http\Controllers\Controller;
use App\Http\Requests\PlanRequest;
use App\Models\Plan;
use App\Models\PlanCategory;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PlanController extends Controller
{
    function index() : Response
    {
        $search = request('search');
        $sort = request()->input('sort', 'latest');
        $perPage = request()->input('per_page', 10); 

        $plans = Plan::with('category')->latest()->paginate($perPage)->withQueryString();

        $response = response()->json([
            'data' => $plans->items(),
            'pagination' => [
                'total' => $plans->total(),
                'per_page' => $plans->perPage(),
                'current_page' => $plans->currentPage(),
                'last_page' => $plans->lastPage()
            ]
        ]);

        return Inertia::render('Plans/Index',[
            'plans' => $response
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
                'interval' => $request->interval,
                'plan_category_id' => 1,
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

    function show($slug) : Response
    {
        if(!request('wordpress') && !auth()->user()) return abort(404);
        $plan = Plan::where('slug', $slug)->first();
       
        if(request('wordpress')){
            return Inertia::render('Plans/WordpressShow',[
                'plan' => $plan,
            ]);
        }
        return Inertia::render('Plans/Show',[
            'plan' => $plan
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
                'interval' => $request->interval,
                'plan_category_id' => 1,
                'photo' => $url,
                'description' => $request->description
            ]);
        } else {
            $plan->update([
                'name' => $request->name,
                'price' => $request->price,
                'interval' => $request->interval,
                'plan_category_id' => 1,
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