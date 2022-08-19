/* eslint quotes: ["error", "double"] */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: "#BC8034",
        lightGrey: "#C9C9C9",
        brown: "#583420",
        lightBrown: "#765948",
        bladeBrown: "#4D3F38",
        darkBrown: "#392525",
        swamp: "#274747",
        beige: "#F1E5D5",
      },
      fontFamily: {
        bubblegum: "'Bubblegum Sans', cursive",
        inter: "'Inter', sans-serif",
      },
      gridTemplateColumns: {
        "auto-fit-140": "repeat(auto-fit, 140px)",
        "auto-fit-220": "repeat(auto-fit, minmax(220px, 1fr))",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
};

