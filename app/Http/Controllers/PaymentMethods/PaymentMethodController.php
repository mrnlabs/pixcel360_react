<?php

namespace App\Http\Controllers\PaymentMethods;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentMethodController extends Controller
{
    public function index()
    {
        return Inertia::render('PaymentMethods/Index', [
            'paymentMethods' => auth()->user()->paymentMethods(),
            'defaultPaymentMethod' => auth()->user()->defaultPaymentMethod(),
            'setupIntent' => auth()->user()->createSetupIntent(),
        ]);
    }

    public function store(Request $request)
    {
        // $request->validate([
        //     'payment_method' => 'required|string',
        // ]);
        try {
            auth()->user()->addPaymentMethod($request->payment_method);

            // If this is the first payment method, make it the default
            if (!auth()->user()->hasDefaultPaymentMethod()) {
                auth()->user()->updateDefaultPaymentMethod($request->payment_method);
            }

            return back()->with('success', 'Payment method added successfully');
        } catch (\Exception $e) {
            return back()->with('error', 'Unable to add payment method: ' . $e->getMessage());
        }
    }

    public function destroy(Request $request, $paymentMethodId)
    {
        try {
            $paymentMethod = auth()->user()->findPaymentMethod($paymentMethodId);
            $paymentMethod->delete();

            return back()->with('success', 'Payment method removed successfully');
        } catch (\Exception $e) {
            return back()->with('error', 'Unable to remove payment method: ' . $e->getMessage());
        }
    }

    public function markDefault(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|string',
        ]);

        try {
            auth()->user()->updateDefaultPaymentMethod($request->payment_method);

            return back()->with('success', 'Default payment method updated');
        } catch (\Exception $e) {
            return back()->with('error', 'Unable to update default payment method: ' . $e->getMessage());
        }
    }
}