<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\CartService;
use App\Services\PayfastService;
use App\Http\Requests\PlanRequest;
use Illuminate\Support\Facades\Log;

class PayfastController extends Controller
{

    public PayfastService $payfastService;
   
    public function __construct(PayfastService $payfastService = null) {
        $this->payfastService = $payfastService;
    }
    public function initiate(Request $request)
    {
        //remember to validate request
        try{
           $payFastGeneratedHtml = $this->payfastService->pay($request);
           return Inertia::render('Checkout/PayfastForm', ['payFastGeneratedHtml' => $payFastGeneratedHtml]);
        } catch(\Exception $e){
            throw $e;
        }
    }

    function cancel() {
        return Inertia::render('Checkout/PayfastCancel');
    }
    public function return(Request $request){
        //dd('Return',$request);
        return Inertia::render('Subscriptions/Subscription');
    }
    public function notify()
    {
        Log::info('notify');
        //remember to validate request
        try{
            // $this->payfastService->notify();
            return 'success';
        } catch(\Exception $e){
            throw $e;
        }
    }

  
}
