<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Event;
use App\Models\Issue;
use App\Models\Subscription;
use Illuminate\Support\Facades\DB;
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
        $totalSubscriptions = isInternalPortalUser() ? Subscription::count() : auth()->user()->subscriptions()->count();
        $totalOrders = 100;
        
        // Get percentage changes
        $eventsChange = $this->calculatePercentageChange('previous_events_count', $totalEvents, 0.95);
        $usersChange = $this->calculatePercentageChange('previous_users_count', $totalUsers, 0.97);
        $subscriptionsChange = $this->calculatePercentageChange('previous_subscriptions_count', $totalSubscriptions, 0.96);
        $ordersChange = $this->calculateMonthOverMonthChange('Order', 100);
        $customerQueries = $this->calculateCustomerQueriesChange();
        
        return [
            'metrics' => collect([
                [
                    'label' => 'Total Events',
                    'value' => number_format($totalEvents),
                    'percentageChange' => $eventsChange,
                    'isPositive' => $eventsChange >= 0,
                    'icon' => 'chart-bar',
                    'iconBgColor' => 'bg-primary',
                    'route' => 'events',
                    'outerBgColor' => 'border-primary/10 bg-primary/10',
                ],
                // Only include Users metric for superadmin
                isInternalPortalUser() ? [
                    'label' => 'Active Users',
                    'value' => number_format($totalUsers),
                    'percentageChange' => $usersChange,
                    'isPositive' => $usersChange >= 0,
                    'icon' => 'users',
                    'iconBgColor' => 'bg-primarytint1color',
                    'outerBgColor' => 'border-primarytint1color/10 bg-primarytint1color/10',
                    'route' => 'users'
                ] : null,
                [
                    'label' => 'Subscriptions',
                    'value' => number_format($totalSubscriptions),
                    'percentageChange' => $subscriptionsChange,
                    'isPositive' => $subscriptionsChange >= 0,
                    'icon' => 'credit-card',
                    'iconBgColor' => 'bg-primarytint2color',
                    'outerBgColor' => 'border-primarytint2color/10 bg-primarytint2color/10',
                    'route' => 'subscriptions'
                ],
                [
                    'label' => 'Orders',
                    'value' => number_format($totalOrders),
                    'percentageChange' => $ordersChange,
                    'isPositive' => $ordersChange >= 0,
                    'icon' => 'shopping-cart',
                    'iconBgColor' => 'bg-primarytint3color',
                    'outerBgColor' => 'border-primarytint3color/10 bg-primarytint3color/10',
                    'route' => 'orders'
                ],
                isInternalPortalUser() ? [
                    'label' => 'Open Tickets',
                    'value' => number_format($customerQueries),
                    'percentageChange' => $customerQueries,
                    'isPositive' => $customerQueries >= 0,
                    'icon' => 'bug-report',
                    'iconBgColor' => 'bg-secondary',
                    'outerBgColor' => 'border-secondary/10 bg-secondary/10',
                    'route' => 'issues'
                ] : null,
            ])->filter()->values()->all(),
            
            'userAnalytics' => [
                'daily' => $this->getDailyUserAnalytics(),
                'weekly' => $this->getWeeklyUserAnalytics(),
                'monthly' => $this->getMonthlyUserAnalytics(),
            ],
        ];
    }

    private function getDailyUserAnalytics(): array
    {
        $startDate = Carbon::now()->subDays(6)->startOfDay();
        $endDate = Carbon::now()->endOfDay();
        
        // Get new users per day
        $newUsers = User::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('COUNT(*) as count')
        )
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('date')
            ->get()
            ->keyBy('date');
        
        // Get active users per day (example: users who logged in)
        // Replace this query with your actual logic to determine active users
        // This is just a placeholder - adjust according to your database schema
        $activeUsers = User::whereNotNull('last_login_at')
                        ->whereBetween('last_login_at', [$startDate, $endDate])
                        ->count();
        
        // Generate a complete date range and merge the data
        $result = [];
        $currentDate = clone $startDate;
        
        $dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        while ($currentDate <= $endDate) {
            $dateKey = $currentDate->format('Y-m-d');
            $dayName = $dayNames[$currentDate->dayOfWeek == 0 ? 6 : $currentDate->dayOfWeek - 1]; // Adjust for Sunday
            
            $result[] = [
                'date' => $dayName,
                'fullDate' => $dateKey,
                'newUsers' => isset($newUsers[$dateKey]) ? $newUsers[$dateKey]->count : 0,
                'activeUsers' => isset($activeUsers[$dateKey]) ? $activeUsers[$dateKey]->count : 0,
            ];
            
            $currentDate->addDay();
        }
        
        // Calculate totals
        $newUsersTotal = array_sum(array_column($result, 'newUsers'));
        $activeUsersTotal = array_sum(array_column($result, 'activeUsers'));
        $retentionRate = $newUsersTotal > 0 ? min(round(($activeUsersTotal / $newUsersTotal) * 100, 1), 100) : 0;
        
        return [
            'data' => $result,
            'totals' => [
                'newUsers' => $newUsersTotal,
                'activeUsers' => $activeUsersTotal,
                'retentionRate' => $retentionRate,
            ]
        ];
    }
    
    /**
     * Get weekly user analytics for the past 4 weeks.
     *
     * @return array
     */
    private function getWeeklyUserAnalytics(): array
    {
        $result = [];
        
        // Get data for the last 4 weeks
        for ($i = 3; $i >= 0; $i--) {
            $startOfWeek = Carbon::now()->subWeeks($i)->startOfWeek();
            $endOfWeek = Carbon::now()->subWeeks($i)->endOfWeek();
            
            // New users in this week
            $newUsersCount = User::whereBetween('created_at', [$startOfWeek, $endOfWeek])->count();
            
            // Active users in this week (adjust query based on your schema)
            $activeUsersCount = User::whereBetween('last_login_at', [$startOfWeek, $endOfWeek])
                ->count();
            
            $result[] = [
                'date' => 'Week ' . (4 - $i),
                'fullDate' => $startOfWeek->format('Y-m-d') . ' to ' . $endOfWeek->format('Y-m-d'),
                'newUsers' => $newUsersCount,
                'activeUsers' => $activeUsersCount,
            ];
        }
        
        // Calculate totals
        $newUsersTotal = array_sum(array_column($result, 'newUsers'));
        $activeUsersTotal = array_sum(array_column($result, 'activeUsers'));
        $retentionRate = $newUsersTotal > 0 ? min(round(($activeUsersTotal / $newUsersTotal) * 100, 1), 100) : 0;
        
        return [
            'data' => $result,
            'totals' => [
                'newUsers' => $newUsersTotal,
                'activeUsers' => $activeUsersTotal,
                'retentionRate' => $retentionRate,
            ]
        ];
    }
    
    /**
     * Get monthly user analytics for the past 12 months.
     *
     * @return array
     */
    private function getMonthlyUserAnalytics(): array
    {
        $result = [];
        $monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Get data for the last 12 months
        for ($i = 11; $i >= 0; $i--) {
            $startOfMonth = Carbon::now()->subMonths($i)->startOfMonth();
            $endOfMonth = Carbon::now()->subMonths($i)->endOfMonth();
            
            // New users in this month
            $newUsersCount = User::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();
            
            // Active users in this month (adjust query based on your schema)
            $activeUsersCount = User::whereBetween('last_login_at', [$startOfMonth, $endOfMonth])
                ->count();
            
            $result[] = [
                'date' => $monthNames[$startOfMonth->month - 1],
                'fullDate' => $startOfMonth->format('Y-m'),
                'newUsers' => $newUsersCount,
                'activeUsers' => $activeUsersCount,
            ];
        }
        
        // Calculate totals
        $newUsersTotal = array_sum(array_column($result, 'newUsers'));
        $activeUsersTotal = array_sum(array_column($result, 'activeUsers'));
        $retentionRate = $newUsersTotal > 0 ? min(round(($activeUsersTotal / $newUsersTotal) * 100, 1), 100) : 0;
        
        return [
            'data' => $result,
            'totals' => [
                'newUsers' => $newUsersTotal,
                'activeUsers' => $activeUsersTotal,
                'retentionRate' => $retentionRate,
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

     public function getUserAnalytics(): array
    {
        return [
            'daily' => $this->getDailyUserAnalytics(),
            'weekly' => $this->getWeeklyUserAnalytics(),
            'monthly' => $this->getMonthlyUserAnalytics(),
        ];
    }

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

    public function calculateCustomerQueriesChange(){
        $lastMonthCount = Issue::where('status', '=', 'open')->count();            
        return $lastMonthCount;
    }
}