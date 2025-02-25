<?php

namespace App\Services;

use App\Models\User;
use App\Models\Event;
use App\Models\Subscription;
use Illuminate\Support\Facades\Cache;

class MetricsService
{
    /**
     * Get dashboard metrics data.
     *
     * @return array
     */
    public function getDashboardMetrics(): array
    {
        // Count totals
        $totalEvents = Event::count();
        $totalUsers = User::count();
        $totalSubscriptions = Subscription::count();
        $totalOrders = 100;
        
        // Get percentage changes
        $eventsChange = $this->calculatePercentageChange('previous_events_count', $totalEvents, 0.95);
        $usersChange = $this->calculatePercentageChange('previous_users_count', $totalUsers, 0.97);
        $subscriptionsChange = $this->calculatePercentageChange('previous_subscriptions_count', $totalSubscriptions, 0.96);
        $ordersChange = $this->calculateMonthOverMonthChange('Order', 100);
        $customerQueries = $this->calculateMonthOverMonthChange('CustomerQuery', 100);
        
        return [
            [
                'label' => 'Total Events',
                'value' => number_format($totalEvents),
                'percentageChange' => $eventsChange,
                'isPositive' => $eventsChange >= 0,
                'icon' => 'chart-bar',
                'iconBgColor' => 'bg-primary',
                'route' => 'events'
            ],
            [
                'label' => 'Active Users',
                'value' => number_format($totalUsers),
                'percentageChange' => $usersChange,
                'isPositive' => $usersChange >= 0,
                'icon' => 'users',
                'iconBgColor' => 'bg-primarytint1color',
                'route' => 'users'
            ],
            [
                'label' => 'Subscriptions',
                'value' => number_format($totalSubscriptions),
                'percentageChange' => $subscriptionsChange,
                'isPositive' => $subscriptionsChange >= 0,
                'icon' => 'credit-card',
                'iconBgColor' => 'bg-primarytint2color',
                'route' => 'subscriptions'
            ],
            [
                'label' => 'Orders',
                'value' => number_format($totalOrders),
                'percentageChange' => $ordersChange,
                'isPositive' => $ordersChange >= 0,
                'icon' => 'shopping-cart',
                'iconBgColor' => 'bg-primarytint3color',
                'route' => 'orders'
            ],
            [
                'label' => 'Customer Queries',
                'value' => number_format($customerQueries),
                'percentageChange' => $customerQueries,
                'isPositive' => $customerQueries >= 0,
                'icon' => 'bug-report',
                'iconBgColor' => 'bg-secondary',
                'route' => 'customer-queries'
            ]
        ];
    }
    
    /**
     * Calculate percentage change and update cache.
     *
     * @param string $cacheKey
     * @param int $currentValue
     * @param float $fallbackFactor
     * @return float
     */
    private function calculatePercentageChange(string $cacheKey, int $currentValue, float $fallbackFactor): float
    {
        // Get previous value from cache, or use fallback
        $previousValue = Cache::get($cacheKey, $currentValue * $fallbackFactor);
        
        // Calculate percentage change
        $percentageChange = $previousValue > 0 
            ? round(($currentValue - $previousValue) / $previousValue * 100, 1) 
            : 0;
        
        // Store current value for next comparison
        Cache::put($cacheKey, $currentValue, now()->addDay());
        
        return $percentageChange;
    }
    
    /**
     * Alternative method: Calculate month-over-month change.
     *
     * @param string $model
     * @param int $currentValue
     * @return float
     */
    public function calculateMonthOverMonthChange(string $model, int $currentValue): float
    {
        $modelClass = "App\\Models\\$model";
        
        if (!class_exists($modelClass)) {
            return 0;
        }
        
        $lastMonthCount = $modelClass::whereMonth('created_at', '=', now()->subMonth()->month)
            ->whereYear('created_at', '=', now()->subMonth()->year)
            ->count();
            
        return $lastMonthCount > 0 
            ? round(($currentValue - $lastMonthCount) / $lastMonthCount * 100, 1) 
            : 0;
    }
}