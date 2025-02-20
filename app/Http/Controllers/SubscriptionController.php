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

    function show($slug) {
        $subscription = auth()->user()->subscriptions()->with('plan')->where('slug', $slug)->first();
        return Inertia::render('Subscriptions/ViewInvoice',[
            'subscription' => $subscription
        ]);
        
    }

}
