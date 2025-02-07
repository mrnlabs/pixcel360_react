<?php

namespace App\Services;

use App\Models\VideoSetting;

class VideoSettingsService
{
    
    public function getAllVideoSettings()
    {
        return VideoSetting::all();
    }

    public function createVideoSettings(array $data)
    {
        return VideoSetting::create($data);
    }

    public function getVideoSettings($settingsId)
    {
        return VideoSetting::find($settingsId);
    }

    public function updateVideoSettings($settingsId, array $data)
    {
        $videoSettings = VideoSetting::find($settingsId);

        if (!$videoSettings) {
            return false; // Video settings not found
        }

        $videoSettings->update($data);
        return $videoSettings;
    }

    public function deleteVideoSettings($settingsId)
    {
        $videoSettings = VideoSetting::find($settingsId);

        if (!$videoSettings) {
            return false; // Video settings not found
        }

        $videoSettings->delete();
        return true;
    }
}
