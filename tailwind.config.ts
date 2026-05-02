import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'spin-slower': 'spin 20s linear infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'orbit': 'orbit 14s linear infinite',
        'orbit-reverse': 'orbitReverse 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 15px rgba(99,102,241,0.3), 0 0 30px rgba(99,102,241,0.1)',
          },
          '50%': {
            boxShadow: '0 0 25px rgba(99,102,241,0.6), 0 0 60px rgba(99,102,241,0.25)',
          },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(90px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(90px) rotate(-360deg)' },
        },
        orbitReverse: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg) translateX(120px) rotate(360deg)' },
        },
      },
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 2vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 2.5vw, 1rem)',
        'fluid-base': 'clamp(1rem, 3vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 3.5vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 4vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 4.5vw, 1.875rem)',
        'fluid-3xl': 'clamp(1.875rem, 5vw, 2.25rem)',
        'fluid-4xl': 'clamp(2.25rem, 6vw, 3rem)',
        'fluid-5xl': 'clamp(3rem, 7vw, 3.75rem)',
        'fluid-6xl': 'clamp(3.75rem, 8vw, 4.5rem)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

export default config
