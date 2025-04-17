<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
  
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }


    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'success' => $request->session()->get('success'),
            'error' => $request->session()->get('error'),
            'auth' => [
                'user' => $request->user(),
                'roles' => $request->user() ? $request->user()->roles->pluck('name') : [],
                'current_subscription' => $request->user() ? $request->user()->currentSubscription()->with('plan')->first() : null
            ],
            'profile_placeholder' => 'https://pixcelcapetown.s3.af-south-1.amazonaws.com/placeholders/128x128.png',
        ];
    }
}
