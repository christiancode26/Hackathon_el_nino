/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#2E9E5B',
          blue: '#2B7DE9',
          dark: '#1F2933',
          bg: '#F5F7F6',
          lightGreen: '#EAF7EE',
          lightBlue: '#EBF3FE',
        },
        risk: {
          green: '#2E9E5B',
          yellow: '#F4C430',
          orange: '#F28C28',
          red: '#D64545',
        }
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
