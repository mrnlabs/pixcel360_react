<?php

use Illuminate\Support\Facades\Auth;

if (!function_exists('isInternalPortalUser')) {
    /**
     * Check if the user is an internal portal user (i.e. System Admin role)
     *
     * @return bool
     */
    function isInternalPortalUser(): bool
    {
        return Auth::check() && Auth::user()->hasRole(['System Admin', 'System SuperAdmin']);
    }
}