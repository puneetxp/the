/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: "300px",
        sx: "600px",
        xx: "960px",
      },},
  },
  
  plugins: [],
};
