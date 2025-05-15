/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e3f2fd",
          100: "#bbdefb",
          200: "#90caf9",
          300: "#64b5f6",
          400: "#42a5f5",
          500: "#2196f3", // <== основной
          600: "#1e88e5",
          700: "#1976d2",
          800: "#1565c0",
          900: "#0d47a1",
        },
      },
      borderRadius: {
        ios: "20px", // <== кастомный класс rounded-ios
      },
      boxShadow: {
        'ios': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'ios-md': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
