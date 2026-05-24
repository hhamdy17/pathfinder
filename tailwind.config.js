/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#EEEDFE',
          100: '#CECBF6',
          200: '#AFA9EC',
          500: '#7C6FF7',
          700: '#534AB7',
          900: '#3C3489',
        },
        teal:  { DEFAULT: '#1D9E75', light: '#E1F5EE' },
        coral: { DEFAULT: '#D85A30', light: '#FAECE7' },
        amber: { DEFAULT: '#BA7517', light: '#FAEEDA' },
      },
    },
  },
  plugins: [],
}
