/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "Tilt-Neon": ["Tilt Neon", "sans-serif"],
      },
      screens: {
        sxxx: "300px",
        sxx: "370px",
        sx: "450px",
        mdd: "770px",
      },
    },
  },
  plugins: [],
};
