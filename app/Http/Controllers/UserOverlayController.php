<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Event;
use App\Models\Overlay;
use Illuminate\Http\Request;
use App\Rules\PNGHasTransparency;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
        
        $eventId = explode('&', $request->event_id)[0];
      
      
        $request->validate([
            'pngFile' => ['required', 'image', 'mimes:png'],
        ]);
        
        // Store the overlay image
        $filePath = Storage::put('video_overlays', $request->file('pngFile'));
                
        $url = Storage::url($filePath);
        
        if ($filePath) {
            $event = Event::whereSlug($eventId)->first();
            if(!$event) {
                return back()->with('error', 'Event not found');
            }
            
            // Begin a database transaction to ensure data integrity
            DB::beginTransaction();
            
            try {
                // First, set event's overlay_id to null
                $event->update(['overlay_id' => null]);
                
                // Handle existing overlays based on apply_to_all flag
                if (!$request->apply_to_all) {
                    // If not applying to all, delete previous overlays
                    Overlay::where('user_id', auth()->id())
                          ->where('event_id', $event->id)
                          ->delete();
                }
                
                // Create the new overlay with event_id
                $overlay = Overlay::create([
                    'name' => $request->file('pngFile')->getClientOriginalName(),
                    'path' => $url,
                    'is_admin' => false,
                    'user_id' => auth()->id(),
                    'event_id' => $event->id, // Add event_id here
                ]);
                
                // Update the event to use this new overlay
                $event->update(['overlay_id' => $overlay->id]);
                
                // Commit the transaction
                DB::commit();
                
                return back()->with('success', 'Overlay created successfully');
            } catch (\Exception $e) {
                // If anything goes wrong, roll back the transaction
                DB::rollBack();
                return back()->with('error', 'Failed to create overlay: ' . $e->getMessage());
            }
        }
        
        // Handle the case where file upload failed
        return back()->with('error', 'Failed to upload file');
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

    function displaySelectedOverlay(Request $request){
        $overlay = Overlay::findOrFail($request->overlay);
        //pluck id and name of events only
        $event = Event::whereSlug($request->event)->first();
        $overlaysLength = Overlay::where('user_id', auth()->id())->count();
        return Inertia::render('UserOverLays/SelectedOverlay', [
            'overlayPreset' => $overlay,
            'event' => $event,
            'overlaysLength' => $overlaysLength
        
        ]);
    }

    function getEventOverlays($slug){
        $event = Event::whereSlug($slug)->first();
        $overlays = Overlay::where('user_id', auth()->id())->where('event_id', $event->id)->get();
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

    function getAllOverlays($eventSlug){
        $event = Event::whereSlug($eventSlug)->first();
        $overlays = Overlay::where('user_id', auth()->id())->where('event_id', $event->id)->get();
        return Inertia::render('UserOverLays/AllOverlays', [
            'overlays' => $overlays,
            'event' => $event,
        ]);
    }
}
