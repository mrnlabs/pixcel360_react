<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Schedule::command('subscriptions:check-expiring')
    ->dailyAt('08:00')
->appendOutputTo(storage_path('logs/subscription-reminders.log'));

// Run Horizon snapshot command to keep metrics available
Schedule::command('horizon:snapshot')->everyMinute(); 

Schedule::command('emails:cart-abandonment --hour')->everyTenMinutes()->appendOutputTo(storage_path('logs/abandonment-emails.log'));
    
    // Run once per day for day-old abandonments
 Schedule::command('emails:cart-abandonment --day')->dailyAt('19:36')->appendOutputTo(storage_path('logs/abandonment-emails.log'));