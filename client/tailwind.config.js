/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'profile-bg': "url('https://i.imgur.com/AJjXKvG.png')",
      },
      backgroundSize: {
        'auto-100%': 'auto 100%', // Custom size
      },
    },
  },
  plugins: [],
}