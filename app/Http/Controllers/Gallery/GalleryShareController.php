<?php

namespace App\Http\Controllers\Gallery;

use App\Http\Controllers\Controller;
use App\Jobs\SendGalleryShareEmail;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class GalleryShareController extends Controller
{
    public function shareGallery(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'emails' => 'required|array',
            'emails.*' => 'required|email',
            'event_id' => 'required|exists:events,id',
            'gallery_link' => 'required|url'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $event = Event::findOrFail($request->event_id);
        $emails = $request->emails;
        $galleryLink = $request->gallery_link;

        try {
            foreach ($emails as $email) {
                SendGalleryShareEmail::dispatch(
                    $email,
                    $event,
                    $galleryLink
                );
            }

            return back()->with('success', 'Gallery shared successfully!');
        } catch (\Exception $e) {
            Log::error('Failed to share gallery: ' . $e->getMessage());
            return back()->with('error', 'Failed to share gallery');
        }
    }
}