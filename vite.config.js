import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],

    // server: {
    //     host: true, // Allows external access
    //     port: 5173,
    //     strictPort: true,
    //     allowedHosts: [
    //       'https://04a6-197-185-169-117.ngrok-free.app', // Add your ngrok domain here
    //       '.ngrok.io', // (Optional) Allows all ngrok subdomains
    //     ],
    //   },
});
