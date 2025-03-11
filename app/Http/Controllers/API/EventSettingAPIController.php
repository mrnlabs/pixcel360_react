<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Throwable;

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

    public function uploadAudio(Request $request)
    {

        try{
            if($request->hasFile('audioFile')) {
                $event = Event::with('boomerang_setting')->where('slug', $request->slug)->first();
                $filePath = Storage::put('audios', $request->file('audioFile'));
                
                $url = Storage::url($filePath);
                $video = $event->boomerang_setting()->update(['add_audio_file' => $filePath]);
                return response()->json([
                    'message' => 'Audio uploaded successfully',
                    'status' => 200,
                    'path' => $url,
                    'video' => $event = Event::where('slug', $request->slug)->first()
                ], 200);
            }
          
        
            return response()->json(['message' => 'No file uploaded'], 400);
        } catch (Throwable $th){
            throw $th;
        }
    }

    function uploadOverlay(Request $request) {
        try {
            if($request->hasFile('overlay')) {
                $event = Event::with('boomerang_setting')->where('slug', $request->slug)->first();
                $filePath = Storage::put('overlays', $request->file('overlay'));
                
                $url = Storage::url($filePath);
                $video = $event->boomerang_setting()->update(['overlay' => $filePath]);
                return response()->json([
                    'message' => 'Overlay uploaded successfully',
                    'status' => 200,
                    'path' => $url,
                    'video' => $event = Event::where('slug', $request->slug)->first()
                ], 200);
            }
          
        
            return response()->json(['message' => 'No file uploaded'], 400);
        } catch (Throwable $th){
            throw $th;
        }
    }
}