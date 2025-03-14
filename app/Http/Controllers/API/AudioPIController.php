<?php

namespace App\Http\Controllers\API;

use App\Models\Event;
use App\Models\Video;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class AudioPIController extends Controller
{


    public function getPresignedUrl(Request $request)
    {
        // Validate the request
        $request->validate([
            'filename' => 'required|string',
            'contentType' => 'required|string'
        ]);
    
        // Generate a unique filename to prevent collisions
        $filename = Str::uuid() . '_' . $request->filename;
        $filePath = 'audios/' . $filename;
    
        // Get the S3 disk
        $disk = Storage::disk('s3');
        
        // Get the S3 client
        $client = $disk->getClient();
        $bucket = config('filesystems.disks.s3.bucket');
    
        // Create a command to put an object WITHOUT ACL parameter
        $command = $client->getCommand('PutObject', [
            'Bucket' => $bucket,
            'Key' => $filePath,
            'ContentType' => $request->contentType,
            // Remove the ACL line: 'ACL' => 'public-read'
        ]);
    
        // Create a pre-signed URL that will be valid for 15 minutes
        $presignedRequest = $client->createPresignedRequest($command, '+15 minutes');
        $presignedUrl = (string) $presignedRequest->getUri();
    
        // Return the pre-signed URL and the final file path
        return response()->json([
            'url' => $presignedUrl,
            'filePath' => $filePath,
            's3Url' => $disk->url($filePath)
        ]);
    }

    public function updateAudioS3(Request $request, $slug){
            $request->validate([
                'audioFilePath' => 'required|string',
                'audioFileUrl' => 'required|string'
            ]);
            
            $event = Event::with('boomerang_setting')->where('slug', $slug)->first();
            $event->boomerang_setting()->update(['add_audio_file' => $request->audioFileUrl]);
            return back()->with('success', 'Audio updated successfully');
            
            // return response()->json([
            //     'message' => 'Audio updated successfully',
            //     'status' => 200,
            //     'path' => $request->audioFileUrl,
            //     'video' => Event::where('slug', $slug)->first()
            // ]);
     }
}