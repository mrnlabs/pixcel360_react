<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckTrial
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // dd($request->path());
        if ($request->routeIs('subscription.trial-ended') || $request->is('subscriptions/*') || $request->path() == 'plans') {
            return $next($request);
        }

        if (auth()->check() && !isInternalPortalUser() && auth()->user()->trial_ends_at && now()->gt(auth()->user()->trial_ends_at)) {
             return to_route('subscription.trial-ended');
        }
        return $next($request);
    }
}
