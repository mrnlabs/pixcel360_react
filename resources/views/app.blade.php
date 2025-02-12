<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"  dir="ltr" data-nav-layout="vertical" class="light" data-header-styles="light" data-menu-styles="dark" 
data-width="fullwidth"  data-vertical-style="overlay" data-icon-overlay="open">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <style>
            .authentication-background {
    position: relative !important;
    background-color: rgb(var(--primary)) !important;
}
        </style>
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <!-- If route = '/' then put class 'authentication-background' -->
    <body class="{{ Route::currentRouteName() === 'home' ? 'authentication-background' : '' }} {{ Route::currentRouteName() === 'register' ? 'authentication-background' : '' }}">
        @inertia
        @inertia
    </body>
</html>
