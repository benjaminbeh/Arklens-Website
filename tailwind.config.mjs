/** @type {import('tailwindcss').Config} */

/*
 * Swiss Future Grid — design tokens
 *
 * ink     near-black typography and the dark "technical" sections
 * paper   warm off-white page backgrounds
 * steel   grey-blue supporting tones (secondary text, borders, diagrams)
 * signal  the single Arklens accent (Swiss signal red)
 *
 * `primary` is kept as an alias of `signal` so pages that have not yet been
 * migrated (legal, privacy, terms) stay on-brand without code changes.
 */
const signal = {
  50: '#FEF3F2',
  100: '#FDE4E1',
  200: '#FBCDC7',
  300: '#F7A99F',
  400: '#FF6B5E', // accent on dark backgrounds (6.6:1 on ink-900)
  500: '#E8392B',
  600: '#D52B1E', // primary accent on light backgrounds (5.0:1 with white)
  700: '#B3231A',
  800: '#921F18',
  900: '#791E19',
  950: '#420C09',
};

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        signal,
        primary: signal,
        ink: {
          950: '#0B0D10',
          900: '#111418',
          800: '#1A1E24',
          700: '#262B33',
          600: '#3A414B',
        },
        paper: {
          DEFAULT: '#FAFAF7',
          100: '#F4F3EE',
          200: '#EAE8E1',
        },
        steel: {
          50: '#F3F5F8',
          100: '#E6EAF0',
          200: '#D3D9E2',
          300: '#B4BECB',
          400: '#8C98A8',
          500: '#66727F',
          600: '#4F5B68',
          700: '#3D4753',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        // System mono stack: used for indices, labels and diagram nodes. No extra download.
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        // Fluid display sizes so headings never become oversized at 320px.
        'display-xl': ['clamp(2.375rem, 1.55rem + 3.7vw, 4.75rem)', { lineHeight: '1.02', letterSpacing: '-0.035em', fontWeight: '600' }],
        'display-lg': ['clamp(2.25rem, 1.5rem + 3.6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-md': ['clamp(2rem, 1.4rem + 2.8vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.028em', fontWeight: '600' }],
        'display-sm': ['clamp(1.75rem, 1.3rem + 1.8vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.022em', fontWeight: '600' }],
        'heading-xl': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'heading-lg': ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '600' }],
        'heading-md': ['1.375rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.4', letterSpacing: '-0.005em', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.65', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.55', fontWeight: '400' }],
        label: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.12em', fontWeight: '500' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        // Restrained radii. Larger legacy radii kept for unmigrated pages.
        xs: '2px',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        hairline: '0 1px 0 rgba(17, 20, 24, 0.06)',
        lift: '0 1px 2px rgba(17, 20, 24, 0.05), 0 8px 24px -12px rgba(17, 20, 24, 0.18)',
        soft: '0 2px 8px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.06)',
        medium: '0 4px 16px rgba(0, 0, 0, 0.08), 0 8px 32px rgba(0, 0, 0, 0.12)',
        strong: '0 8px 32px rgba(0, 0, 0, 0.12), 0 16px 64px rgba(0, 0, 0, 0.16)',
      },
      transitionTimingFunction: {
        swiss: 'cubic-bezier(0.2, 0.7, 0.1, 1)',
      },
    },
  },
  plugins: [],
};
