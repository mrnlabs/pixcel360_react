<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlanRequest;
use App\Models\Plan;
use App\Services\PlanService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlanController extends Controller
{

    protected  PlanService $planService;
    public function __construct(PlanService $planService)

    {
        $this->planService = $planService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $plans = Plan::latest()->get();
           return Inertia::render('Plans/Plan', ['plans' => $plans]);
        } catch(\Exception $e){
            return Inertia::render('Error', ['message' => $e->getMessage()]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PlanRequest $request)
    {
        try {
            $this->planService->createPlan($request->all());
            return back()->with('success', 'Plan created successfully');
        } catch (\Throwable $th) {
            return back()->with('error', $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
