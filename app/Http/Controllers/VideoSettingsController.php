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
        $event->video_setting()->update($request->all());
        return back()->with('success', 'Event settings updated successfully');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
