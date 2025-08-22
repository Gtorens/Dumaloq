/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Light Theme
        'light-background': '#F9FAFB', // gray-50
        'light-primary': '#FFFFFF',
        'light-text': '#1F2937', // slate-800
        'light-text-secondary': '#6B7280', // gray-500
        
        // Dark Theme
        'dark-background': '#111827', // A softer, deep blue-gray
        'dark-primary': '#1F2937', // slate-800
        'dark-text': '#F3F4F6', // gray-100
        'dark-text-secondary': '#9CA3AF', // gray-400

        // Accents
        'accent-red': '#DC2626',
        'accent-green': '#16A34A',
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-in': 'fadeIn 1.5s ease-out forwards',
        'optimized-pulse': 'optimizedPulse 4s ease-in-out infinite',
        'optimized-ping': 'optimizedPing 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        optimizedPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        optimizedPing: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    }
  },
  plugins: [],
}