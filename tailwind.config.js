module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        secondary: '#64748b',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 