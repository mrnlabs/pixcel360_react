<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"  dir="ltr" data-nav-layout="vertical" class="light" data-header-styles="light" data-menu-styles="dark" 
data-width="fullwidth"  data-vertical-style="overlay" data-icon-overlay="open">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Pixcel360') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net"/>
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('favicons/apple-touch-icon.png') }}">
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicons/favicon-32x32.png') }}">
        <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('favicons/favicon-16x16.png') }}">
        <link rel="manifest" href="{{ asset('favicons/site.webmanifest') }}">

        
        <style>
            .authentication-background {
    position: relative !important;
    /* background-color: #eef2f5 !important; */
}
        </style>
        <script src="https://www.payfast.co.za/onsite/engine.js"></script>
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
