<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventSetting;
use Illuminate\Http\Request;

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
        if($request->hasFile('audioFile')) {
            $path = $request->file('audioFile')->storeAs('audios',$event->name.'/'. $request->file('audioFile')->getClientOriginalName(), 'public');
            $event->boomerang_setting()->update(['add_audio_file' => $path]);
            return back()->with('success', 'Audio uploaded successfully');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
