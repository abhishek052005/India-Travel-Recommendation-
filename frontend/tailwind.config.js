/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: { DEFAULT: "#FF6B35", 50: "#FFF1EC", 100: "#FFE2D5", 500: "#FF6B35", 700: "#C44A15" },
        teal: { DEFAULT: "#0D9488", 50: "#F0FDFA", 500: "#0D9488", 700: "#0F766E" },
        navy: { DEFAULT: "#0F172A", 800: "#1E293B", 900: "#0F172A" },
        gold: { DEFAULT: "#F59E0B", 300: "#FCD34D", 500: "#F59E0B" },
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0F172A 0%, #1a3a5c 50%, #0D9488 100%)",
        "card-gradient": "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0))",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        "float": "float 3s ease-in-out infinite",
        "spin-slow": "spin 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(30px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
}
