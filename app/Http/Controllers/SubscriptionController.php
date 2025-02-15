<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Price;
use Stripe\Product;
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
        try {
            $request->validate([
                'payment_method' => 'required|string',
                'plan_id' => 'required|exists:plans,id'
            ]);

            $user = auth()->user();
            $plan = Plan::findOrFail($request->plan_id);

            // Set Stripe API key
            Stripe::setApiKey(config('cashier.secret'));

            // Create or get Stripe Product
            if (!$plan->stripe_product_id) {
                $product = Product::create([
                    'name' => $plan->name,
                    'description' => $plan->description
                ]);
                $plan->update(['stripe_product_id' => $product->id]);
            }

            // Create a new Price object
            $price = Price::create([
                'product' => $plan->stripe_product_id,
                'unit_amount' => (int)($request->price * 100), // Convert to cents
                'currency' => 'usd',
                'recurring' => [
                    'interval' => strtolower($plan->price_per) // 'month' or 'year'
                ],
                'metadata' => [
                    'plan_id' => $plan->id
                ],
                
            ]);

            // Create or get Stripe customer
            $user->createOrGetStripeCustomer();
            $user->updateDefaultPaymentMethod($request->payment_method);

            // Create subscription with the new price
            $subscription = $user->newSubscription('default', $price->id)
                ->create($request->payment_method);

            return redirect()->route('dashboard')
                ->with('success', 'Subscription created successfully!');

        } catch (IncompletePayment $exception) {
            return redirect()->route('cashier.payment', [
                $exception->payment->id,
                'redirect' => route('dashboard')
            ]);
        } catch (\Exception $e) {
            return back()->with('error', 'Error: ' . $e->getMessage());
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
