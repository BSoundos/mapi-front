/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#141943',
        'primary-normal': '#8F00FF',
        'primary-gray': '#BDBDBD',
        'primary-darker': '#0E1135',
        'primary-linear': '#141843',
        'secondary-blue': '#2F80ED',
        'secondary-gray': '#E2E2E2',
        'dark-text': '#00101E',
        'neutral': '#858C94',
        'neutral-2': '#DDDDDD',
        'misc-linear': '#7E89AC4D',
        'mapi-primary': '#CB3CFF',
        'mapi-secondary-1': '#0B1739',
        'mapi-secondary-2': '#8951FF',
        'mapi-secondary-3': '#21C3FC',
        'mapi-secondary-4': '#0E43FB',
        'mapi-secondary-5': '#FDB52A',
        'mapi-neutral-1': '#081028',
        'mapi-neutral-2': '#0A1330',
        'mapi-neutral-3': '#0B1739',
        'mapi-neutral-4': '#7E89AC',
        'mapi-neutral-5': '#AEB9E1',
        'mapi-neutral-6': '#D1DBF9',
        'mapi-neutral-7': '#D9E1FA',
        'mapi-neutral-8': '#FFFFFF',
        'corner-1': {
          300: '#7E89AC',
        },
        'c-1': '#634CD7', 
        'lineartp': '#69EACB',
      },
      backgroundColor: {
        'custom-opacity-red': 'rgba(216, 114, 125, 0.1)', // Light red
        'custom-opacity-brown': 'rgba(231, 214, 149, 0.1)', // Light brown
        'custom-opacity-yellow': 'rgba(239, 245, 205, 0.1)', // Light yellow 
        'custom-opacity-blue': 'rgba(87, 195, 255, 0.2)',
      },
      fontFamily: {
        'plus-jakarta-sans': ['Plus Jakarta Sans', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'public-sans': ['Public Sans', 'sans-serif'],
      },
      screens: {
        'desktop': '1281px',
        'laptop': '1025px',
        'tablet': '769px',
      }
    },
  },
  plugins: [],
}

