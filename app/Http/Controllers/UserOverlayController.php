<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Overlay;
use Illuminate\Http\Request;
use App\Rules\PNGHasTransparency;
use Illuminate\Support\Facades\Storage;

class UserOverlayController extends Controller
{
  
    public function index()
    {
        $userOverlays = Overlay::user(auth()->id())->latest()->get();
        $adminOverlays = Overlay::admin()->latest()->get();
        
        return view('overlays.index', compact('userOverlays', 'adminOverlays'));
    }

    
    public function create()
    {
        return view('overlays.create');
    }

   
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => ['required', 'image', 'mimes:png', new PNGHasTransparency()],
        ]);

        // Store the overlay image
        $path = $request->file('image')->store('user/overlays/' . auth()->id(), 'public');

        Overlay::create([
            'name' => $request->name,
            'path' => $path,
            'type' => 'image',
            'is_admin' => false,
            'user_id' => auth()->id(),
        ]);

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Overlay created successfully']);
        }

        return redirect()->route('overlays.index')
            ->with('success', 'Overlay created successfully');
    }

 
    public function edit(Overlay $overlay)
    {
        // Ensure the overlay belongs to the authenticated user
        if ($overlay->user_id !== auth()->id()) {
            return redirect()->route('overlays.index')
                ->with('error', 'You can only edit your own overlays.');
        }

        return view('overlays.edit', compact('overlay'));
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

    /**
     * Remove the specified user overlay from storage
     */
    public function destroy(Overlay $overlay)
    {
        // Ensure the overlay belongs to the authenticated user
        if ($overlay->user_id !== auth()->id()) {
            return redirect()->route('overlays.index')
                ->with('error', 'You can only delete your own overlays.');
        }

        // Delete the image file
        Storage::disk('public')->delete($overlay->path);
        
        // Delete the overlay
        $overlay->delete();

        if (request()->wantsJson()) {
            return response()->json(['message' => 'Overlay deleted successfully']);
        }

        return redirect()->route('overlays.index')
            ->with('success', 'Overlay deleted successfully');
    }
}
