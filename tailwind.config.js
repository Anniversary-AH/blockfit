/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#1E1F25',
        bone: '#F7F7F5',
        eucalyptus: '#3A7D66',
        terracotta: '#C06C4C',
      },
    },
  },
  plugins: [],
}
