<?php

namespace App\Services;

use App\Models\Event;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class QRCodeService
{
   public function generate($data, $eventId) {
       // Generate QR code using the information
       $qrCode = QrCode::format('png')->size(300)->generate($data);
       // Store the image in storage
       $imagePath = Storage::disk('public')->put('qrcodes', $qrCode);
       // Store the path in the database with the event ID
       $event = Event::findOrFail($eventId);
       $event->qr_code_path = $imagePath;
       $event->save();
       return $qrCode;
   }

   //get the path
   public function getPath($eventId) {
       $event = Event::findOrFail($eventId);
       return $event->qr_code_path;
   }


}
