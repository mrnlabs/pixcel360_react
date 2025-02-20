<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class SubscriptionController extends Controller
{

    function index() {
        $subscriptions = auth()->user()->subscriptions()->with('plan')->latest()->get();
        return Inertia::render('Subscriptions/Index',[
            'subscriptions' => $subscriptions
        ]);
    }

}
