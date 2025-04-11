<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Services\MetricsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * The metrics service instance.
     *
     * @var \App\Services\MetricsService
     */
    protected $metricsService;
    
    /**
     * Create a new controller instance.
     *
     * @param \App\Services\MetricsService $metricsService
     * @return void
     */
    public function __construct(MetricsService $metricsService)
    {
        $this->metricsService = $metricsService;
    }
    
    /**
     * Display the dashboard with metrics.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        if(!isInternalPortalUser()){
            return $this->regular_user();
        }
        $events = Event::latest()->limit(5)->get();
       
        
        return Inertia::render('Dashboard/AdminDashboard', [
            'metrics' => $this->metricsService->getDashboardMetrics(),
            'events' => $events,
        ]);
    }

    public function regular_user()
    {
       $events = Event::where('user_id', auth()->id())->latest()->limit(5)->get();       
        
        return Inertia::render('Dashboard/UserDashboard', [
            'metrics' => $this->metricsService->getDashboardMetrics(),
            'events' => $events,
        ]);
    }
}