<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Inertia\Inertia;

class SubscriptionController extends Controller
{

    function index() {
        $view = null;
        
        if(isInternalPortalUser()) {
            $view = 'AdminSubscriptions/Index';
            $subscriptions = Subscription::with('plan')->latest()->paginate(10);
        }else{
            $view = 'Subscriptions/Index';
            $subscriptions = auth()->user()->subscriptions()->with('plan')->latest()->get();
        }
        
        return Inertia::render($view,[
            'subscriptions' => $subscriptions
        ]);
    }

    function show($slug) {
        $subscription = auth()->user()->subscriptions()->with('plan')->where('slug', $slug)->first();
        $otherSubscriptions = auth()->user()->subscriptions()->with('plan')->where('slug', '!=', $slug)->get();
        return Inertia::render('Subscriptions/ViewInvoice',[
            'subscription' => $subscription,
            'otherSubscriptions' => $otherSubscriptions
        ]);
        
    }

    function trialEnded() {
        return Inertia::render('Subscriptions/TrialEnded');
    }
    
    function renew() {
        //return Inertia::render('Subscriptions/TrialEnded');
    }

}
