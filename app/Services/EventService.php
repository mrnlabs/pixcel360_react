<?php

namespace App\Services;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Models\Event;
use Illuminate\Support\HtmlString;

class EventService
{
public function getEvents(){
    $events = Event::with('setting')->latest()->get();
    // $data = $events->map(function ($event) {
    //     $event->qrCode = QrCode::size(150)->generate("'<div>'.$event->name.'</div>'");
    //     return $event;
    // });
    
    return $events;
}


    public function getEvent($slug)
    {
        return Event::with('setting','video_setting')->whereSlug($slug)->first();
    }

    public function createEvent(array $data)
    {
//        add user id
        $data['user_id'] = auth()->user()->id;
        $event = Event::create($data);
        return $event;
    }

    public function updateEvent(string $slug, array $data)
    {
        $event = Event::whereSlug($slug)->firstOrFail();
        $data['description'] = request('description');
        $event->update($data);
        return "Event updated successfully!";
    }

    function duplicate($slug) {
        $event = Event::whereSlug($slug)->first();
        $event->name = request('name');
        $newEvent = $event->replicate();
        $newEvent->slug = sha1(time());
        $newEvent->save();
        
        // Replicate and associate settings with the new event
        $newEventSettings = $event->setting->replicate();
        $newEventSettings->event_id = $newEvent->id;
        $newEventSettings->save();
        
        $videoSettings = $event->video_setting->replicate();
        $videoSettings->event_id = $newEvent->id;
        $videoSettings->save();
        
        return $newEvent;
    }
    
   
    public function deleteEvent($slug)
    {
        // Find the event
        $event = Event::whereSlug($slug)->first();

        if (!$event) {
            // Event not found
            return false;
        }

        // Delete the event
        $event->delete();

        return true;
    }
}
