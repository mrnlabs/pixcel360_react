<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{

    public function index()
    {
        try{
            return Inertia::render('Subscriptions/Subscription');
        }catch(\Exception $e){
            return Inertia::render('Error', ['message' => $e->getMessage()]);
        }

    }

    public function show(){
        try{
          return Inertia::render('Subscriptions/Invoice');
        }catch(\Exception $e){
            return Inertia::render('Error', ['message' => $e->getMessage()]);
        }
    }

}
