<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlanRequest;
use App\Models\Plan;
use App\Services\CartService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public CartService $cartservice;
    public function __construct(CartService $cartservice ) {
        $this->cartservice = $cartservice;
    }

  
    public function checkout(Request $request)
    {
        $request->validate(['id' => 'required|exists:plans,id']);
        try{
            $cart = Plan::find($request->id);
           return Inertia::render('Checkout/Checkout', ['cart' => $cart]);
        } catch(\Exception $e){
            return Inertia::render('Error', ['message' => $e->getMessage()]);
        }
    }

    function addToCart(Request $request) {
        // $request->validate(['id' => 'required|exists:plans,id']);
        try {
            $cart = $this->cartservice->addToCart();
            return Inertia::render('Pricing/Cart', [
                'cart' => $cart,
                'success' => 'Added to cart successfully',
            ]);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

   
    public function destroy(string $id)
    {
        //
    }
}
