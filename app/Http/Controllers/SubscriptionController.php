<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Cashier\Exceptions\IncompletePayment;

class SubscriptionController extends Controller
{

    public function showSubscriptionForm($slug)
    {
        // if ($user->subscribed('default')) {
        //     return Inertia::render('Subscriptions/Success');
        // }
        $plan = Plan::whereSlug($slug)->first();
        
        return Inertia::render('Subscriptions/Checkout', [
            'intent' => auth()->user()->createSetupIntent(),
            'plan' => $plan
        ]);

    }

    public function processSubscription(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|string',
            'plan_id' => 'required|exists:plans,id'
        ]);
    
        $user = auth()->user();
        $plan = Plan::findOrFail($request->plan_id);
        
        try {
            $user->createOrGetStripeCustomer();
            $user->updateDefaultPaymentMethod($request->payment_method);
            
            // Use stripe_price_id instead of plan_id for the subscription
            $subscription = $user->newSubscription('default', $plan->stripe_price_id)
                ->create($request->payment_method);
    
            return redirect()->route('dashboard')
                ->with('success', 'Subscription created successfully!');
                
        } catch (IncompletePayment $exception) {
            return redirect()->route('cashier.payment', [
                $exception->payment->id,
                'redirect' => route('dashboard')
            ]);
        }
    }

    public function cancel()
    {
        auth()->user()->subscription('default')->cancel();
        
        return redirect()->back()
            ->with('success', 'Subscription cancelled successfully');
    }

    public function success()
    {
        return view('subscriptions.success');
    }

    public function resume()
    {
        auth()->user()->subscription('default')->resume();
        
        return redirect()->back()
            ->with('success', 'Subscription resumed successfully');
    }

}
