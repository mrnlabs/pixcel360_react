<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Overlay;
use Illuminate\Http\Request;
use App\Rules\PNGHasTransparency;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserOverlayController extends Controller
{
  
    public function index()
    {
        $userOverlays = Overlay::user(auth()->id())->latest()->get();
        $userQuery = Overlay::query()->user(auth()->id());
        $userOverlays = $this->applyFiltersToQuery($userQuery)->paginate(10);
        $userOverlays->appends(request()->query());
        
        $adminQuery = Overlay::query()->admin();
        $adminOverlays = $this->applyFiltersToQuery($adminQuery)->paginate(10);
        $adminOverlays->appends(request()->query());
       
        return Inertia::render('UserOverLays/Index', [
            'userOverlays' => $userOverlays,
            'adminOverlays' => $adminOverlays,
            'isAdmin' => isInternalPortalUser()
        ]);
    }

    private function applyFiltersToQuery($query)
{
    // Handle search
    if(request()->has('search')) {
        $query->where('name', 'like', '%'.request('search').'%');
    }
    
    // Handle sorting
    if(request()->has('sort')) {
        $sortDirection = request('sort') === 'oldest' ? 'asc' : 'desc';
        $query->orderBy('created_at', $sortDirection);
    } else {
        $query->latest();
    }
    
    // Additional filters
    if(request()->has('type')) {
        $query->where('type', request('type'));
    }
    
    return $query;
}

    

    public function addOverlayToEvent(Request $request, $overlayId){
        $request->validate([
            'eventSlug' => 'required|string|exists:events,slug',
        ]);
        $event = Event::whereSlug($request->eventSlug)->first();
        $event->update([
            'overlay_id' => $overlayId,
        ]);
        return redirect()->route('user.overlays', $event->slug)->with('success', 'Overlay added successfully');
    }

   
    public function store(Request $request)
    {
        if($request->is('api/*')) {
           return $this->uploadOverlayAPI($request);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'pngFile' => ['required', 'image', 'mimes:png'],
        ]);
     
        // if(!validatePngTransparency($request->file('pngFile'))) {
        //     return back()->with('error', 'Image has no transparency');
        // }
       
        // Store the overlay image
        $filePath = Storage::put('video_overlays', $request->file('pngFile'));
                
        $url = Storage::url($filePath);
        Overlay::create([
            // if $request->is('api/*') get name 
            'name' => $request->name,
            'path' => $url,
            'is_admin' => false,
            'user_id' => auth()->id(), // Admin overlays don't belong to any specific user
        ]);

        return back()->with('success', 'Overlay created successfully');
    }

    public function uploadOverlayAPI(Request $request)
    {
        
        $request->validate([
            'slug' => 'required|exists:events,slug',
            'pngFile' => ['required','mimes:png'],
        ]);

        // if(!validatePngTransparency($request->file('pngFile'))) {
        //     return response()->json([
        //         'status' => 'error',
        //         'message' => 'Image has transparency',
        //     ], 400);
        // }
        
        $event = Event::whereSlug($request->slug)->first();
        $filePath = Storage::put('video_overlays', $request->file('pngFile'));
                
        $url = Storage::url($filePath);
        $overlay = Overlay::create([
            'name' => pathinfo($request->file('pngFile')->getClientOriginalName(), PATHINFO_FILENAME),
            'path' => $url,
            'is_admin' => false,
            'user_id' => $event->overlay->user_id,
        ]);
        if($overlay){
            $event->overlay_id = $overlay->id;
            $event->save();
        }
        
           return response()->json([
            'status' => 'success',
            'message' => 'Overlay created successfully', 
            'path' => $url
        ], 200);
        
    }



    /**
     * Update the specified user overlay in storage
     */
    public function update(Request $request, Overlay $overlay)
    {
        // Ensure the overlay belongs to the authenticated user
        if ($overlay->user_id !== auth()->id()) {
            return redirect()->route('overlays.index')
                ->with('error', 'You can only edit your own overlays.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'image' => ['nullable', 'image', 'mimes:png', new PNGHasTransparency()],
        ]);

        $data = [
            'name' => $request->name,
        ];

        // If a new image is uploaded
        if ($request->hasFile('image')) {
            // Delete the old image
            Storage::disk('public')->delete($overlay->path);
            
            // Store the new image
            $data['path'] = $request->file('image')->store('user/overlays/' . auth()->id(), 'public');
        }

        $overlay->update($data);

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Overlay updated successfully']);
        }

        return redirect()->route('overlays.index')
            ->with('success', 'Overlay updated successfully');
    }

    function displaySelectedOverlay($overlayId){
        $overlay = Overlay::findOrFail($overlayId);
        return Inertia::render('UserOverLays/SelectedOverlay', [
            'overlay' => $overlay,
        ]);
    }

    /**
     * Remove the specified user overlay from storage
     */
    public function destroy($overlayId)
    {
        
        $overlay = Overlay::findOrFail($overlayId);
        // Ensure the overlay belongs to the authenticated user
        if ($overlay->user_id !== auth()->id()) {
            abort(403, 'You can only delete your own overlays.');
        }

    
        $overlay->delete();
        return back()->with('success', 'Overlay deleted successfully');
    }
}
