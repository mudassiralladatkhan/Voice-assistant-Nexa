/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'nexa-dark': '#0A0F1A',
        'nexa-darker': '#05080F',
        'nexa-cyan': '#00F6FF',
        'nexa-teal': '#00FFC3',
        'nexa-blue': '#0099FF',
        'nexa-purple': '#8B5CF6', // Brighter purple
        'nexa-pink': '#EC4899',
        'nexa-glass': 'rgba(255, 255, 255, 0.03)',
        'nexa-glass-border': 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        'mono': ['"JetBrains Mono"', 'Monaco', 'Menlo', 'Ubuntu Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'float': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'wave': 'wave 2s ease-in-out infinite',
        'aurora': 'aurora 20s ease-in-out infinite alternate',
        'neural-pulse': 'neural-pulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 15px rgba(0, 246, 255, 0.4), 0 0 30px rgba(0, 246, 255, 0.3)',
          },
          '100%': { 
            boxShadow: '0 0 30px rgba(0, 246, 255, 0.7), 0 0 60px rgba(0, 246, 255, 0.5)',
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.5)' }
        },
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'neural-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.05)', opacity: 0.8 },
        },
      },
      backdropBlur: {
        'xs': '2px',
        '2xl': '40px',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 246, 255, 0.5)',
        'neon-lg': '0 0 40px rgba(0, 246, 255, 0.6)',
        'neon-xl': '0 0 60px rgba(0, 246, 255, 0.7)',
      }
    },
  },
  plugins: [],
};
