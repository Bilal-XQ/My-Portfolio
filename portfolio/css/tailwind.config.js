module.exports = {
  darkMode: 'class', // Active le mode sombre via la classe 'dark'
  content: [
    '../*.html',
    '../js/*.js',
    '../js/**/*.js',
    '../css/*.css',
  ],
  theme: {
    extend: {
      colors: {
        black: {
          900: '#0a0a0a',
          800: '#18181b',
          700: '#23272f',
          600: '#2d323c',
        },
        blue: {
          50: '#eaf6ff',
          100: '#bae6fd',
          200: '#7dd3fc',
          300: '#38bdf8',
          400: '#0ea5e9',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#172554',
        },
        primary: '#2563eb',
        secondary: '#1e40af',
        accent: '#0ea5e9',
        dark: '#0a0a0a',
        light: '#f3f4f6',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['Fira Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.4,0,0.2,1)',
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4,0,0.6,1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      boxShadow: {
        'card': '0 4px 24px 0 rgba(30, 64, 175, 0.15)',
        'blue-glow': '0 0 16px 0 #2563eb44',
      },
      borderRadius: {
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '128': '32rem',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.200'),
              },
            },
            h1: { color: theme('colors.blue.500') },
            h2: { color: theme('colors.blue.400') },
            h3: { color: theme('colors.blue.300') },
            h4: { color: theme('colors.blue.200') },
            strong: { color: theme('colors.blue.300') },
            code: { color: theme('colors.accent') },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.100'),
            a: { color: theme('colors.blue.300') },
            h1: { color: theme('colors.blue.400') },
            h2: { color: theme('colors.blue.300') },
            h3: { color: theme('colors.blue.200') },
            h4: { color: theme('colors.blue.100') },
          },
        },
      }),
    },
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
} 