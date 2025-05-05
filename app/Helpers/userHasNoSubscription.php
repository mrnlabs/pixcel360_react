<?php

use Illuminate\Support\Facades\Auth;

if (!function_exists('userHasNoSubscription')) {
    /**
     * Check if the user has no subscription (i.e. not a System Admin or System SuperAdmin)
     * or if the user is a trial user and the trial period has ended.
     * @return bool
     */
    function userHasNoSubscription(): bool
    {
        return Auth::check() 
        && !Auth::user()->currentSubscription() 
        && !isInternalPortalUser()
        && !auth()->user()->trial_ends_at && now()->gt(auth()->user()->trial_ends_at);
    }
}