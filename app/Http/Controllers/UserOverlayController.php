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
            'event_id' => 'required|exists:events,slug',
            'pngFile' => ['required', 'image', 'mimes:png'],
        ]);
     
       
        // Store the overlay image
        $filePath = Storage::put('video_overlays', $request->file('pngFile'));
                
        $url = Storage::url($filePath);
        if($filePath){
            $event = Event::whereSlug($request->event_id)->first();
            //if $request->apply_to_all is true then we keep the previously uploaded overlays or else remove existing overlays
            if(!$request->apply_to_all){
                $event->update(['overlay_id' => null]);
                $overlays = Overlay::where('user_id', auth()->id())->get();
                foreach($overlays as $overlay){
                    $overlay->delete();
                }
            }
            
          
            $overlay = Overlay::create([
                'name' => $request->file('pngFile')->getClientOriginalName(),
                'path' => $url,
                'is_admin' => false,
                'user_id' => auth()->id(), // Admin overlays don't belong to any specific user
            ]);
            $event->update(['overlay_id' => $overlay->id]);  
            return back()->with('success', 'Overlay created successfully');
            }

        return back()->with('error', 'Error creating overlay');
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
        //pluck id and name of events only
        $events = Event::where('status', '1')->where('user_id', auth()->id())->get(['slug', 'name']);
        $overlaysLength = Overlay::where('user_id', auth()->id())->count();
        return Inertia::render('UserOverLays/SelectedOverlay', [
            'overlayPreset' => $overlay,
            'events' => $events,
            'overlaysLength' => $overlaysLength
        
        ]);
    }

    function getEventOverlays($slug){
        $event = Event::whereSlug($slug)->first();
        $overlays = Overlay::where('user_id', auth()->id())->get();
        return response()->json([
            'overlays' => $overlays
        ], 200);
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

    function downloadOverlayImage(Request $request){
       return getSignedDownloadUrl($request);
    }
}
