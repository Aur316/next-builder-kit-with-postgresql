import daisyui from 'daisyui'

const config = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        slideUp: {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        slideDown: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(100%)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 300ms ease-out',
        fadeOut: 'fadeOut 300ms ease-in',
        slideUp: 'slideUp 300ms ease-out',
        slideDown: 'slideDown 300ms ease-out',
      },
    },
  },
  plugins: [daisyui],
}

export default config
