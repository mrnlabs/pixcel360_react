<?php

namespace App\Services;

use App\Models\Video;

class VideoService
{
    public function getAllVideos()
    {
        return Video::all();
    }

    public function createVideo(array $data)
    {
        return Video::create($data);
    }

    public function getVideo($videoId)
    {
        return Video::find($videoId);
    }

    public function updateVideo($videoId, array $data)
    {
        $video = Video::find($videoId);

        if (!$video) {
            return false; // Video not found
        }

        $video->update($data);
        return $video;
    }

    public function deleteVideo($videoId)
    {
        $video = Video::find($videoId);

        if (!$video) {
            return false; // Video not found
        }

        $video->delete();
        return true;
    }
}
