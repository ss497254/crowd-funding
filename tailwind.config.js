/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#f8f9fa",
          2: "#e9ecef",
          3: "#dee2e6",
          4: "#ced4da",
          5: "#adb5bd",
          6: "#6c757d",
          7: "#495057",
          8: "#343a40",
          9: "#212529",
        },
      },
      screens: {
        xs: "320px",
        sm: "425px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
      },
    },
  },
  plugins: [],
};
