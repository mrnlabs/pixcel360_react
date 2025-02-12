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
   
    public function index(Request $request, $slug)
    {
      $search = $request->input('search', '');

      $event = Event::with(['videos' => function ($query) use ($search) {
        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }
    }])->where('slug', $slug)->first();

      return Inertia::render('Gallery/Index',[
        'event' => $event
      ]);
    }
}
