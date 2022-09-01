/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        move: "move 10s ease-in-out infinite alternate",
      },
      keyframes: {
        move: {
          "0%": { transform: "translate(0px, 0px)" },
          "100%": { transform: "translate(75px, 135px)" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("@tailwindcss/forms")],
};
