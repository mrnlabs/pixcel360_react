<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
   
    public function generateInvoice($slug)
    {
        $subscription = auth()->user()->subscriptions()->with('plan')->where('slug', $slug)->first();
        $otherSubscriptions = auth()->user()->subscriptions()->with('plan')->where('slug', '!=', $slug)->get();
        
        $pdf = PDF::loadView('invoices.template', ['subscription' => $subscription, 'otherSubscriptions' => $otherSubscriptions]);
        return $pdf->download(auth()->user()->first_name. '_'.auth()->user()->last_name.'_'.$subscription->plan->name.'.pdf');
    }
 
}
