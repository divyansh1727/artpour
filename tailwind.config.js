/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],      // Default body
        heading: ["Playfair Display", "serif"], // For headings
        script: ["Dancing Script", "cursive"],  // For logo or special elements
      },
    },
  },
  plugins: [],
};
