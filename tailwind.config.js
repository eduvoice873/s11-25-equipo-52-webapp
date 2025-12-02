/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       fontFamily: {
        sans: "var(--font-nunito)", 
        nunito: "var(--font-nunito)",
        lato: "var(--font-lato)",
      },
      colors: {
    brand: {
      blue: "#1E3A8A",
      light: "#60A5FA",
      yellow: "#FCD34D",
      gray: "#F3F4F6",
    },
  },
      
    },
  },
  plugins: [],
};
