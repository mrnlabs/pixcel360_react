<?php

use Illuminate\Http\Request;

function getSignedDownloadUrl(Request $request){
    $path = $request->input('path');
    
    // AWS SDK setup
    $s3 = new \Aws\S3\S3Client([
        'version' => 'latest',
        'region' => env('AWS_DEFAULT_REGION'),
        'credentials' => [
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
        ],
    ]);
    
    $bucket = env('AWS_BUCKET');
    
    // Extract only the object key part from the path
    // If path is already just the object key (without the bucket URL), use it directly
    $key = '';
    if (strpos($path, 'https://') !== false || strpos($path, 'http://') !== false) {
        // Extract the path part after the bucket name
        $bucketUrl = "https://{$bucket}.s3." . env('AWS_DEFAULT_REGION') . ".amazonaws.com/";
        $key = str_replace($bucketUrl, '', $path);
    } else {
        // Path is already just the key
        $key = ltrim($path, '/');
    }
    
    // For the specific example you provided
    // If path is the full URL: https://picxel-bucket.s3.af-south-1.amazonaws.com/video_overlays/iiyqLMqtvuTjzGIKKEqbbDyLPrdEG0mN5quOHRxy.png
    // The key should be: video_overlays/iiyqLMqtvuTjzGIKKEqbbDyLPrdEG0mN5quOHRxy.png
    
    // Create a pre-signed URL with the appropriate headers
    $command = $s3->getCommand('GetObject', [
        'Bucket' => $bucket,
        'Key' => $key,
        'ResponseContentDisposition' => 'attachment; filename="' . basename($key) . '"',
    ]);
    
    $presignedRequest = $s3->createPresignedRequest($command, '+15 minutes');
    
    return response()->json([
        'download_url' => (string) $presignedRequest->getUri()
    ]);
}