const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      width: {
        cmdk: 'var(--cmdk-width)',
      },
      height: {
        cmdk: 'var(--cmdk-height)',
        'cmdk-body': 'var(--cmdk-height-body)',
        'cmdk-footer': 'var(--cmdk-height-footer)',
      },
      maxHeight: {
        'cmdk-body': 'var(--cmdk-height-body)',
        'cmdk-footer': 'var(--cmdk-height-footer)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
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
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // cmdk
        cmdk: {
          footer: 'hsl(var(--cmdk-footer))',
          kbd: {
            DEFAULT: 'hsl(var(--cmdk-kbd))',
            accent: 'hsl(var(--cmdk-kbd-accent))',
          },
          placeholder: 'hsl(var(--cmdk-placeholder))',
          'section-title': 'hsl(var(--cmdk-section-title))',
          'background-accent': 'hsl(var(--cmdk-background-accent))',
          'background-footer': 'hsl(var(--cmdk-background-footer))',
          'background-footer-accent':
            'hsl(var(--cmdk-background-footer-accent))',
          'background-separator': 'hsl(var(--cmdk-background-separator))',
          'background-kbd': {
            DEFAULT: 'hsl(var(--cmdk-background-kbd))',
            accent: 'hsl(var(--cmdk-background-kbd-accent))',
          },
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
