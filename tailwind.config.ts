/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        "foundation-violet-normal": "#363537",
        "foundation-gray-normal": "#969596",
        "primary-primary": "#FEE633",
        "primary-normal": "#FDDF00",
        "primary": "#FDDF00",
      },
      fontFamily: {
        poppins: ["Poppins", "PoppinsRegular", "PoppinsMedium", "sans-serif"],
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
