import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        ring: "hsl(var(--ring))"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-art': 'linear-gradient(45deg, hsl(var(--primary)) 0%, hsl(var(--destructive)) 100%)',
        'gradient-brand': 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--destructive)) 100%)',
        'gradient-shine': 'linear-gradient(60deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)'
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        'color-shift': 'color-shift 8s ease infinite',
        shine: 'shine 2s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        'color-shift': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        shine: {
          '0%': {
            'background-position': '-200% center'
          },
          '100%': {
            'background-position': '200% center'
          }
        },
        pulse: {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '.5'
          }
        }
      },
      aspectRatio: {
        square: '1 / 1'
      },
      textShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.25)',
        DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.35)',
        lg: '0 2px 6px rgba(0, 0, 0, 0.45)'
      },
      boxShadow: {
        glass: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)'
      }
    },
  },
  plugins: [
    ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) => {
      addUtilities({
        '.aspect-w-1': { aspectRatio: '1' },
        '.aspect-w-2': { aspectRatio: '2' },
        '.aspect-w-3': { aspectRatio: '3' },
        '.aspect-w-4': { aspectRatio: '4' },
        '.aspect-h-1': { aspectRatio: '1' },
        '.aspect-h-2': { aspectRatio: '2' },
        '.aspect-h-3': { aspectRatio: '3' },
        '.aspect-h-4': { aspectRatio: '4' },
      })
    },
    ({ matchUtilities, theme }: { matchUtilities: (utilities: Record<string, { textShadow: string }>, options?: Record<string, unknown>) => void; theme: (path: string) => unknown }) => {
      matchUtilities(
        {
          'text-shadow': (value: string): { textShadow: string } => {
            return { textShadow: value };
          },
        },
        { values: theme('textShadow') }
      )
    }
  ],
} satisfies Config;
