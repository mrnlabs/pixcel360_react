<?php

namespace App\Http\Controllers\Plans;

use App\Http\Controllers\Controller;
use App\Models\PlanCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PlanController extends Controller
{
    function index() : Response
    {
        return Inertia::render('Plans/Index');
    }

    function create() : Response
    {
        $planCategories = PlanCategory::all();
        return Inertia::render('Plans/Create',[
            'planCategories' => $planCategories
        ]);
    }

    function store(Request $request) {
        dd($request->all());
    }
}