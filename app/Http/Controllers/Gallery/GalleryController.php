<?php

namespace App\Http\Controllers\Gallery;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GalleryController extends Controller
{
   
    public function index(Request $request, $slug)
{
    $search = $request->input('search', '');
    $sort = $request->input('sort', 'latest'); // default to latest

    $event = Event::where('slug', $slug)->first();

// Then build your videos query separately
        $videosQuery = $event->videos();

        if ($search) {
            $videosQuery->where('name', 'like', "%{$search}%");
        }

        // Apply sort conditions
        switch ($sort) {
            case 'oldest':
                $videosQuery->oldest();
                break;
            case 'name_asc':
                $videosQuery->orderBy('name', 'asc');
                break;
            case 'name_desc':
                $videosQuery->orderBy('name', 'desc');
                break;
            default: // 'latest'
                $videosQuery->where('processed_at', '!=', null)->latest();
        }

        // Now paginate with all conditions applied
        $videos = $videosQuery->paginate(8);
    return Inertia::render('Gallery/Index', [
        'event' => $event,
        'videos' => $videos,
        'filters' => [
            'search' => $search,
            'sort' => $sort
        ]
    ]);
}

public function get_gallery_api(Request $request)
{
    $search = $request->input('search', '');
    $sort = $request->input('sort', 'latest'); // default to latest
    $event = Event::where('slug', $request->slug)->first();
    $videosQuery = $event->videos();

if ($search) {
    $videosQuery->where('name', 'like', "%{$search}%");
}

// Apply sort conditions
switch ($sort) {
    case 'oldest':
        $videosQuery->oldest();
        break;
    case 'name_asc':
        $videosQuery->orderBy('name', 'asc');
        break;
    case 'name_desc':
        $videosQuery->orderBy('name', 'desc');
        break;
    default: // 'latest'
        $videosQuery->where('processed_at', '!=', null)->latest();
}

// Now paginate with all conditions applied
$videos = $videosQuery->paginate(10);

    return response()->json([
            'videos' => $videos,
            'filters' => [
                'search' => $search,
                'sort' => $sort
            ]
            ]);
}
}
