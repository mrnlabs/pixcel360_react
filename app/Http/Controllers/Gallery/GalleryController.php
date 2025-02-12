<?php

namespace App\Http\Controllers\Gallery;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Plan;
use App\Services\CartService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GalleryController extends Controller
{
   
    public function index($slug)
    {
      $event = Event::with('videos')->where('slug', $slug)->first();
      return Inertia::render('Gallery/Index',[
        'event' => $event
      ]);
    }
}
