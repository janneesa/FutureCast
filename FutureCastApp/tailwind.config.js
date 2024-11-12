/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#E2E3E4",
        card: "#FFFFFF",
        primaryText: "#1F2937", // Dark gray
        secondaryText: "#4B5563", // Medium gray
        mutedText: "#9CA3AF", // Light gray
        primaryButton: "#18181b", // Dark Button
        secondaryButton: "#F9FAFB", // Light Button
      },
    },
  },
  plugins: [],
};
