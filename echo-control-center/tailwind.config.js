/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'control-bg': '#0a0a0a',
                'control-panel': '#111111',
                'control-border': '#1f1f1f',
                'control-accent': '#00ff88',
            },
        },
    },
    plugins: [],
}
