/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: { light: "#eee7f4", dark: "#231d34" },
        search: {
          bg: {
            light: "#e5d6f3",
            dark: "#2a243e",
          },
          line: {
            light: "#aa186f",
            dark: "#ff7e34",
          },
          help: "#5c5874",
          card: {
            dark: "#14111d",
          },
          info: {
            dark: "#aba8bd",
          },
          outline: {
            dark: "#7c1ce4",
          },
        },
      },
    },
  },
  plugins: [],
};
