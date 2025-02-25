<?php

namespace App\Services;
use App\Models\Event;

class EventService
{
    public function getEvents()
    {
        $search = request('search');
        $sort = request()->input('sort', 'latest');
        $perPage = request()->input('per_page', 10); 
    
        $query = Event::with('setting')
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->when($sort === 'latest', function ($query) {
                $query->latest();
            })
            ->when($sort === 'oldest', function ($query) {
                $query->oldest();
            });
    
        if (!isInternalPortalUser()) {
            $query->where('user_id', auth()->user()->id);
        }
    
        return $query->paginate($perPage)->withQueryString();
    }


    public function getEvent($slug)
    {
        return Event::with('setting','boomerang_setting','sharing_method','sharing_subject')->whereSlug($slug)->first();
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
       
        $videoSettings = $event->boomerang_setting->replicate();
        $videoSettings->event_id = $newEvent->id;
        $videoSettings->save();


        $sharingSettings = $event->sharing_method->replicate();
        $sharingSettings->event_id = $newEvent->id;
         $sharingSettings->save();

        $subjectSettings = $event->sharing_subject->replicate();   
        $subjectSettings->event_id = $newEvent->id;
        $subjectSettings->save();
        
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
