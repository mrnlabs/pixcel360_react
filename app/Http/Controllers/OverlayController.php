<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Overlay;
use Illuminate\Http\Request;
use App\Rules\PNGHasTransparency;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OverlayController extends Controller
{
  
    public function index()
    {
        $query = Overlay::query();

        $query->where('is_admin', true);
        
        if(request()->has('search')) {
            $query->where('name', 'like', '%'.request('search').'%');
        }
        
      
        if(request()->has('sort')) {
            $sortDirection = request('sort') === 'oldest' ? 'asc' : 'desc';
            $query->orderBy('created_at', $sortDirection);
        } else {
            $query->orderBy('created_at', 'desc');
        }
        
        $overlays = $query->paginate(10);

        return Inertia::render('OverLays/Index', [
            'overlays' => $overlays,
            'isAdmin' => isInternalPortalUser()
        ]);
    }


    public function create()
    {
        return Inertia::render('AdminOverlay/Create');
    }


    public function store(Request $request)
    {
        
        $request->validate([
            'name' => 'required|string|max:255',
            'pngFile' => ['required', 'image', 'mimes:png'],
        ]);
        

        // Store the overlay image
        $filePath = Storage::put('video_overlays', $request->file('pngFile'));
                
        $url = Storage::url($filePath);
        Overlay::create([
            'name' => $request->name,
            'path' => $url,
            'is_admin' => true,            
            'dimensions' => json_encode($request->dimensions),
            'user_id' => null, // Admin overlays don't belong to any specific user
        ]);

        return back()->with('success', 'Overlay created successfully');
    }

  
    public function edit(Overlay $overlay)
    {
        // Ensure this is an admin overlay
        if (!$overlay->is_admin) {
            return redirect()->route('admin.overlays.index')
                ->with('error', 'You can only edit admin overlays here.');
        }

        return view('admin.overlays.edit', compact('overlay'));
    }

    public function update(Request $request, Overlay $overlay)
    {
        // Ensure this is an admin overlay
        if (!$overlay->is_admin) {
            return redirect()->route('admin.overlays.index')
                ->with('error', 'You can only edit admin overlays here.');
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
            $data['path'] = $request->file('image')->store('admin/overlays', 'public');
        }

        $overlay->update($data);

        return redirect()->route('admin.overlays.index')
            ->with('success', 'Overlay updated successfully');
    }

   
    public function destroy($id)
    {
        $overlay = Overlay::findOrFail($id);
        // Ensure this is an admin overlay
        if (!$overlay->is_admin) {
            abort(403);
        }
        // Delete the overlay
        $overlay->delete();

        return back()->with('success', 'Overlay deleted successfully');
    }
}
