<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;
use App\Services\EventService;
use App\Services\VideoSettingsService;
use App\Services\SharingSettingsService;
use App\Http\Requests\CreateEventRequest;
use App\Http\Requests\UpdateEventRequest;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Http\Requests\CreateVideoSettingsRequest;
use App\Http\Requests\CreateSharingSettingsRequest;

class EventController extends Controller
{

    protected  EventService $eventService;
    protected VideoSettingsService $videoSettingsService;
    protected SharingSettingsService $sharingSettingService;
    public function __construct(EventService $eventService, VideoSettingsService $videoSettingsService, SharingSettingsService $sharingSettingService)

    {
        $this->eventService = $eventService;
        $this->videoSettingsService = $videoSettingsService;
        $this->sharingSettingService = $sharingSettingService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
           $events =  $this->eventService->getEvents();
            return Inertia::render('Events/Events', ['events' => $events]);
        } catch (\Exception $e){
            //return Inertia::render('Error', ['message' => $e->getMessage()]);
        }

    }

        public function duplicate($id){
           try {
            $this->eventService->duplicate($id);
            return back()->with('success', 'Event duplicated successfully');
           } catch (\Throwable $th) {
             return back()->with('error', 'Error duplicating event');
           }
        }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateEventRequest $createEventRequest)
    {

        try{
            $new_event = $this->eventService->createEvent($createEventRequest->validated());
            if($new_event){
                $createVideoSettingsRequest['event_id'] = $new_event->id;
               // $createSharingSettingsRequest['event_id'] = $new_event->id;
                // $this->videoSettingsService->createVideoSettings($createVideoSettingsRequest->validated());
               // $this->sharingSettingService->createSharingSettings($createSharingSettingsRequest->validated());
            }
           // redirect to /events route
            return redirect()->route('events');
        } catch (\Exception $e){
            throw $e;
            //return Inertia::render('Error', ['message' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function create()
    {
        try{
            $event =  $this->eventService->getEvent(request('id'));
            return Inertia::render('Events/CreateEvent', ['e_vent' => $event]);
        } catch (\Exception $e){
            return Inertia::render('Error', ['message' => $e->getMessage()]);
        }
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $updateEventRequest,
                           CreateSharingSettingsRequest $updateSharingSettingsRequest,
                           CreateVideoSettingsRequest $updateVideoRequest,
                           $id)
    {
        try{
            $this->eventService->updateEvent($updateEventRequest->validated());
            //update videoSettings and sharingSettings
            $this->sharingSettingService->updateSharingSettings($id, $updateSharingSettingsRequest->validated());
            $this->videoSettingsService->updateVideoSettings($id, $updateVideoRequest->validated());
            return redirect()->route('event.index');
        } catch (\Exception $e){
            return Inertia::render('Error', ['message' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $this->eventService->deleteEvent($id);
            return back()->with('success', 'Event deleted successfully');
        } catch (\Exception $e){
            return back()->with('error', 'Error deleting event');
            //return Inertia::render('Error', ['message' => $e->getMessage()]);
        }
    }

    public function gallery($id){
        try{
            $event =  $this->eventService->getEvent($id);

            return Inertia::render('Events/Gallery', ['event' => $event]);

        } catch (\Exception $e){
            return Inertia::render('Error', ['message' => $e->getMessage()]);
        }
    }
}
