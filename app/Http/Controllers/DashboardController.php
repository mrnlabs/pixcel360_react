<?php

namespace App\Http\Controllers;

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
        return Inertia::render('Dashboard', [
            'metrics' => $this->metricsService->getDashboardMetrics()
        ]);
    }
}