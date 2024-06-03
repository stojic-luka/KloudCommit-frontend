/** @type {import('tailwindcss').Config} */

const safelist = ["bg-lvl-1", "bg-lvl-2", "bg-lvl-3", "bg-lvl-4", "bg-lvl-5", "blank-contribution-cell"];

export default {
  safelist,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
};
