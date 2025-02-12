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
    $sort = $request->input('sort', 'latest'); // default to latest

    $event = Event::with(['videos' => function ($query) use ($search, $sort) {
        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }
        
        switch ($sort) {
            case 'oldest':
                $query->oldest();
                break;
            case 'name_asc':
                $query->orderBy('name', 'asc');
                break;
            case 'name_desc':
                $query->orderBy('name', 'desc');
                break;
            default: // 'latest'
                $query->latest();
        }
    }])->where('slug', $slug)->first();


      return Inertia::render('Gallery/Index',[
        'event' => $event,
        'filters' => [
            'search' => $search,
            'sort' => $sort
        ]
      ]);
    }
}
