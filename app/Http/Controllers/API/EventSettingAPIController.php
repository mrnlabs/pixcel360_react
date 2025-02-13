<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventSetting;
use Illuminate\Http\Request;

class EventSettingAPIController extends Controller
{
    public function updateField(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'field' => ['required', 'string', 'in:front_rear_camera,count_down,duration'],
            'value' => ['required'],
            'slug' => ['required', 'exists:events,slug']
        ]);
    
        try {
            $event = Event::with('setting','boomerang_setting')->whereSlug($request->slug)->first();

           switch ($request->field) {
            case 'front_rear_camera':
                $event->setting()->update(['front_rear_camera' => $request->value,'updated_at' => now()]);
                break;
            case 'count_down':
                $event->setting()->update(['count_down' => $request->value, 'updated_at' => now()]);
                break;
            case 'duration':
                $event->boomerang_setting()->update(['duration' => $request->value,'updated_at' => now()]);
                break;
            
            default:
                return response()->json([
                    'success' => false,
                    'status' => 400,
                    'message' => 'Invalid field'
                ]);
                break;
           }
           
    
            return response()->json([
                'status' => 200,
                'success' => true,
                'message' => ucfirst(str_replace('_', ' ', $request->field)) . ' updated successfully',
                'data' => Event::with('setting','boomerang_setting')->whereSlug($request->slug)->first()
            ]);
    
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update field',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}