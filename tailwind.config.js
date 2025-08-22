module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'hsl(204, 70%, 53%)',
        accent: 'hsl(171, 70%, 33%)',
        bg: 'hsl(210, 36%, 96%)',
        surface: 'hsl(0, 0%, 100%)',
        text: 'hsl(215, 25%, 27%)',
        muted: 'hsl(215, 15%, 50%)',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '16px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(0, 0%, 0%, 0.2), 0 -2px 6px hsla(0, 0%, 0%, 0.1), 0 2px 4px hsla(0, 0%, 0%, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'slide-up': 'slideUp 200ms ease-in-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-light': 'bounce 1s ease-in-out 2',
        'scale-in': 'scaleIn 200ms ease-in-out',
        'slide-in-right': 'slideInRight 200ms ease-in-out',
      },
      typography: {
        display: ['text-3xl', 'font-semibold'],
        body: ['text-base', 'leading-6'],
      },
    },
  },
  plugins: [],
}
