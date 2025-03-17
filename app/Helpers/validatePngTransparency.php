<?php

use Intervention\Image\ImageManager;
use Intervention\Image\Laravel\Facades\Image;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;

function validatePngTransparency($uploadedFile) {
    // First, check if it's a PNG
    if ($uploadedFile->getMimeType() !== 'image/png') {
        return false;
    }
    
    // Load the file into a GD image resource
    $imgdata = imagecreatefrompng($uploadedFile->getRealPath());
    
    if (!$imgdata) {
        return false; // Failed to create image resource
    }
    
    $w = imagesx($imgdata);
    $h = imagesy($imgdata);

    if($w>50 || $h>50){ // Resize the image to save processing if larger than 50px
        $thumb = imagecreatetruecolor(10, 10);
        imagealphablending($thumb, FALSE);
        imagesavealpha($thumb, TRUE); // Make sure we save alpha channel
        imagecopyresized($thumb, $imgdata, 0, 0, 0, 0, 10, 10, $w, $h);
        imagedestroy($imgdata); // Free original resource
        $imgdata = $thumb;
        $w = imagesx($imgdata);
        $h = imagesy($imgdata);
    }
    
    // Run through pixels until transparent pixel is found
    $hasTransparency = false;
    for($i = 0; $i < $w; $i++) {
        for($j = 0; $j < $h; $j++) {
            $rgba = imagecolorat($imgdata, $i, $j);
            if(($rgba & 0x7F000000) >> 24) {
                $hasTransparency = true;
                break 2;
            }
        }
    }
    
    // Free the image resource
    imagedestroy($imgdata);
    
    return $hasTransparency;
}