import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
    	extend: {
    		fontFamily: {
    			// sans: [
    			// 	'Figtree',
                //     ...defaultTheme.fontFamily.sans
                // ]
                sans: ["Inter", "sans-serif"]
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
                'duo-pass': '#FFCC00',
                'photo-pass': '#FF6666',
                'other-pass': '#394dff',
            }
    	}
    },

    plugins: [forms, require("tailwindcss-animate")],
};
