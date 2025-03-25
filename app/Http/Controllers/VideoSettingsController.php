<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Throwable;

class VideoSettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function updateVedioSettings(Request $request, $slug)
    {
        $event = Event::where('slug', $slug)->first();
        // EventSetting::where('event_id', $event->id)->update($request->all());
        $event->setting()->update($request->all());
        // dd($event->setting());
        return back()->with('success', 'Event settings updated successfully');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function updateVedioFunctions(Request $request, $slug)
    {
        $event = Event::where('slug', $slug)->first();
        $event->boomerang_setting()->update($request->all());
        return back()->with('success', 'Event settings updated successfully');
    }
    
    public function updateVedioSubjects(Request $request, $slug)
    {
        $event = Event::where('slug', $slug)->first();
        $event->sharing_subject()->update($request->all());
        return back()->with('success', 'Event settings updated successfully');
    }
    
    public function updateVedioBranding(Request $request, $slug)
    {
        $event = Event::where('slug', $slug)->first();
        $event->setting()->update([
            'gallery_name' => $request->gallery_name,
            'text_button_color' => $request->text_button_color
        ]);
        return back()->with('success', 'Event settings updated successfully');
    }
     public function updateVedioSharingMethod(Request $request, $slug)
    {
        $event = Event::where('slug', $slug)->first();
        $event->sharing_method()->update($request->all());
        return back()->with('success', 'Event settings updated successfully');
    }
     public function updateVedioTimeouts(Request $request, $slug)
    {
        $event = Event::where('slug', $slug)->first();
        $event->boomerang_setting()->update([
            'boomerang_speed' => $request->boomerang_speed,
            // 'boomerang_bounce' => $request->boomerang_bounce,
            // 'slomo_recording_time' => $request->slomo_recording_time,
            'slomo_boomerang' => $request->slomo_boomerang,
            'sharing' => $request->sharing,
            'editing' => $request->editing,
            'props' => $request->props,
            'thanks' => $request->thanks,
            
        ]);
        return back()->with('success', 'Event settings updated successfully');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function uploadVedioAudio(Request $request, $slug)
    {
        $event = Event::where('slug', $slug)->first();
     
        if($request->isMethod('delete')) {
             $event->boomerang_setting()->update(['add_audio_file' => null]);
            return back()->with('success', 'Audio removed successfully');
        }

        if($request->file('audioFile')) {
            try {
                // Validate the file first
                $request->validate([
                    'audioFile' => 'required|file|mimes:mp3,wav,ogg|max:10240',
                ]);
                
                $filePath = Storage::put('audios', $request->file('audioFile'));
                $url = Storage::url($filePath);
                $event->boomerang_setting()->update(['add_audio_file' => $url]);
                return back()->with('success', 'Audio uploaded successfully');
            } catch (Throwable $th) {
                throw $th;
                // return back()->with('error', 'Upload failed: ' . $e->getMessage());
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function updateVedioLogoImage(Request $request, $slug){
        if($request->isMethod('delete')) {
            $event = Event::where('slug', $slug)->first();
            $event->setting()->update(['app_logo' => null]);
            return back()->with('success', 'Logo removed successfully');
        }
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        $event = Event::where('slug', $slug)->first();
        $filePath = Storage::put('logos', $request->file('logo'));
        $url = Storage::url($filePath);
        $event->setting()->update(['app_logo' => $url]);
        return back()->with('success', 'Logo uploaded successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
