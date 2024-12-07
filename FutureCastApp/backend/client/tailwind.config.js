/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable dark mode
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
        // Dark mode colors
        darkBackground: "#1A202C",
        darkCard: "#2D3748",
        darkPrimaryText: "#E2E8F0",
        darkSecondaryText: "#A0AEC0",
        darkMutedText: "#718096",
        darkPrimaryButton: "#4A5568",
        darkSecondaryButton: "#2D3748",

        toastSuccess: "#10B981", // Success green
        toastError: "#EF4444", // Error red
        darkToastBackground: "#2D3748", // Dark mode background
      },
    },
  },
  plugins: [],
};
