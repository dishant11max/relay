import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent:       '#4afe80',
        'accent-dim': 'rgba(74,254,128,0.12)',
        'accent-glow':'rgba(74,254,128,0.06)',
        bg:           '#080808',
        surface:      '#0c0c0c',
        'surface-2':  '#111111',
        border:       '#1a1a1a',
        'border-hi':  '#262626',
        muted:        '#737373',
        'muted-2':    '#a3a3a3',
        body:         '#f5f5f5',
        danger:       '#ff4d4d',
      },
      fontFamily: {
        mono:    ['var(--font-mono)',    'monospace'],
        display: ['var(--font-display)', 'sans-serif'],
      },
      boxShadow: {
        'glow-xs': '0 0 12px rgba(74,254,128,0.06)',
        'glow-sm': '0 0 24px rgba(74,254,128,0.09)',
        'glow-md': '0 0 48px rgba(74,254,128,0.12)',
      },
      borderRadius: {
        card:  '10px',
        badge: '6px',
        btn:   '0px',
      },
    },
  },
  plugins: [],
}

export default config