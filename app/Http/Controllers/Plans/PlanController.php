<?php

namespace App\Http\Controllers\Plans;

use App\Http\Controllers\Controller;
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
        return Inertia::render('Plans/Create');
    }
}