import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1C39BB',    
          light: '#4158D0',
          dark: '#162EA0',
        },
        secondary: {
          DEFAULT: '#0067A5',    
          light: '#0077BE',
          dark: '#00598C',
        },
        primary_accent: {
          DEFAULT: '#57C5C6',  
          light: '#6ED1D2',
          dark: '#4EB1B2',
        },
        secondary_accent: {
          DEFAULT: '#AE6A0B',    
          light: '#C27710',
          dark: '#955B09',
        },  
        text: '#FFFFF0',   
        
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-art': 'linear-gradient(45deg, #1C39BB 0%, #AE6A0B 100%)',
        'gradient-brand': 'linear-gradient(135deg, #1C39BB 0%, #0067A5 50%, #AE6A0B 100%)',
        'gradient-shine': 'linear-gradient(60deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)'
      },
      animation: {
        'color-shift': 'color-shift 8s ease infinite',
        'shine': 'shine 2s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
          },
        },
        'shine': {
          '0%': { 'background-position': '-200% center' },
          '100%': { 'background-position': '200% center' }
        },
        'pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' }
        }
      },
      aspectRatio: {
        'square': '1 / 1',
      },
      textShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.25)',
        DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.35)',
        lg: '0 2px 6px rgba(0, 0, 0, 0.45)',
      },
      boxShadow: {
        glass: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          'text-shadow': (value: string) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    },
  ],
} satisfies Config;
