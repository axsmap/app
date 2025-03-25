/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: [
          "Poppins",
          "PoppinsRegular",
          "PoppinsMedium",
          "Inter",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
