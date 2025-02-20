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

    public function isProduction() : string
    {
        if (!app()->environment(['production'])) {
            return env('FILE_PATH');
        }
        return env('AWS_STORAGE_URL');
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'roles' => $request->user() ? $request->user()->roles->pluck('name') : [],
                'current_subscription' => $request->user() ? $request->user()->currentSubscription()->with('plan')->first() : null
            ],
        ];
    }
}
