module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0c0a09', 900: '#1c1917', 800: '#292524', 700: '#44403c',
          600: '#57534e', 500: '#78716c', 400: '#a8a29e', 300: '#d6d3d1',
          200: '#e7e5e4', 100: '#EAE5DB', 50: '#F9F7F3',
        },
        terracotta: {
          700: '#b45309', 600: '#E87A5D', 500: '#f59e0b', 400: '#fbbf24',
          300: '#fcd34d', 100: '#fef3c7',
        },
        gold: {
          600: '#d97706', 500: '#f59e0b', 400: '#fbbf24', 300: '#fcd34d', 100: '#fef3c7',
        },
        sage: {
          700: '#047857', 600: '#059669', 500: '#10b981', 400: '#34d399', 100: '#d1fae5',
        }
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 24px -4px rgba(15,12,10,0.08)',
        'card': '0 8px 40px -8px rgba(15,12,10,0.1)',
        'glow': '0 0 40px -8px rgba(196,90,74,0.25)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        'pulse-soft': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.7' } }
      }
    }
  }
}
