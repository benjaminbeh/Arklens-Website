/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0070e0',
          50: '#e6f2ff',
          100: '#b3d9ff',
          200: '#80c1ff',
          300: '#4da8ff',
          400: '#1a8fff',
          500: '#0070e0',
          600: '#0059b3',
          700: '#004386',
          800: '#002c5a',
          900: '#00162d',
        },
      },
    },
  },
  plugins: [],
};
