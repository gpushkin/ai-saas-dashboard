/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      brand: {
        DEFAULT: "#4f46e5",
        light: "#eef2ff",
      },
    },
    boxShadow: {
      soft: "0 10px 25px -5px rgba(0,0,0,0.08)",
    },
  },
}
};