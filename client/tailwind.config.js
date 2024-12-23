/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true, // Container ko center karne ke liye
        padding: "1rem", // Container ke liye padding set karna
        screens: {
          sm: "600px", // Custom small breakpoint
          md: "900px", // Custom medium breakpoint
          lg: "1200px", // Custom large breakpoint
          xl: "1440px", // Custom extra-large breakpoint
          "2xl": "1600px", // Custom 2xl breakpoint
        },
      },
    },
  },
  plugins: [],
};
