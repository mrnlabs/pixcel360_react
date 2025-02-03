<?php

namespace App\Services;

use App\Models\SharingSetting;

class SharingSettingsService
{
    public function getAllSharingSettings()
    {
        return SharingSetting::all();
    }

    public function createSharingSettings(array $data)
    {
        return SharingSetting::create($data);
    }

    public function getSharingSettings($settingsId)
    {
        return SharingSetting::find($settingsId);
    }

    public function updateSharingSettings($settingsId, array $data)
    {
        $sharingSettings = SharingSetting::find($settingsId);

        if (!$sharingSettings) {
            return false; // Sharing settings not found
        }

        $sharingSettings->update($data);
        return $sharingSettings;
    }

    public function deleteSharingSettings($settingsId)
    {
        $sharingSettings = SharingSetting::find($settingsId);

        if (!$sharingSettings) {
            return false; // Sharing settings not found
        }

        $sharingSettings->delete();
        return true;
    }
}
