<?php

use App\Jobs\DatabaseBackupJob;
use App\Jobs\CleanupOldBackupsJob;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            \App\Http\Middleware\CheckTrial::class,
        ]);
        $middleware->alias([
            'subscription' => \App\Http\Middleware\CheckSubscription::class,
            'check.trial' => \App\Http\Middleware\CheckTrial::class,
        ]);
        $middleware->validateCsrfTokens(except: [
            'subscriptions/*',
            // 'http://example.com/foo/bar',
            // 'http://example.com/foo/*',
        ]);
    })
    ->withSchedule(function (Schedule $schedule) {
    
        // Run the cleanup job daily at 2:00 AM
        $schedule->job(new CleanupOldBackupsJob)->dailyAt('02:00');

        // Run the database backup job every day at 3:00 AM
        // $schedule->job(new DatabaseBackupJob)->dailyAt('03:00');
        $schedule->command('backups:run-scheduled')->everyMinute();
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
