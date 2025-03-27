<?php

namespace App\Http\Controllers\Gallery;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GalleryController extends Controller
{
   
    public function index(Request $request, $slug){
    $search = $request->input('search', '');
    $sort = $request->input('sort', 'latest'); // default to latest

    $event = Event::with('setting','sharing_method')->where('slug', $slug)->first();

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
$gallery_link = route('shared_gallery', $request->slug);
    return response()->json([
            'videos' => $videos,
            'message' => "Find your Pixcel360 Gallery link here:",
            'gallery_link' => $gallery_link,
            'filters' => [
                'search' => $search,
                'sort' => $sort
            ]
            ]);
}

function share_gallery(Request $request, $slug){
    $event = Event::with('setting', 'sharing_method')->where('slug', $slug)->first();

    $search = $request->input('search', '');
    $sort = $request->input('sort', 'latest'); // default to latest

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
        $videos = $videosQuery->paginate(8);
    return Inertia::render('Gallery/Share', [
        'event' => $event,
        'videos' => $videos,
        'filters' => [
            'search' => $search,
            'sort' => $sort
        ]
    ]);
}

function delete_videos(Request $request)
{
    $request->validate([
        'ids' => 'required|array',
        'ids.*' => 'exists:videos,id'
    ]);

    $videoIds = $request->input('ids');

    $eventIds = Video::whereIn('id', $videoIds)->pluck('event_id')->unique()->toArray();

    foreach ($eventIds as $eventId) {
        $event = Event::find($eventId);
        if (!$event || auth()->id() !== $event->user_id) {
            abort(403, 'Unauthorized');
        }
    }

    Video::whereIn('id', $videoIds)->delete();

    return back()->with('success', 'Videos deleted successfully!');
}


}

