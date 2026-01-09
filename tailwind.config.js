/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary: Denim Blue (#003B5C)
                primary: {
                    50: '#f0f7fb',
                    100: '#e0eff6',
                    200: '#bce0f0',
                    300: '#86c6e7',
                    400: '#4aa3d9',
                    500: '#2383c2',
                    600: '#003B5C', // The requested Denim Blue
                    700: '#003452',
                    800: '#002d46',
                    900: '#00263b',
                    950: '#001826',
                },
                // Secondary: Warm Gray/Slate
                secondary: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                },
                // Accent: Amber/Gold
                accent: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                    950: '#451a03',
                }
            },
            fontFamily: {
                sans: ['Advent Sans', 'Noto Sans', 'Arial', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'card': '0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.04)',
                'glow': '0 0 20px rgba(0, 59, 92, 0.15)',
            }
        },
    },
    plugins: [],
}
