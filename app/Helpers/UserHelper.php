<?php

use Illuminate\Support\Facades\Auth;

if (!function_exists('isInternalPortalUser')) {
    /**
     * Check if the user is an internal portal user (i.e. Admin or SuperAdmin role)
     *
     * @return bool
     */
    function isInternalPortalUser(): bool
    {
        return Auth::check() && Auth::user()->hasRole(['Admin', 'SuperAdmin']);
    }
}