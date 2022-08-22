module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        lila: {
          200: "#F0F3F9",
          300: "#6c6594",
          350: "#3F3A59",
          400: "#604fcd",
          700: "#1E40AF",
          500: "#130b43",
        }
      },
      gridTemplateColumns: {
        layout: "18rem 1fr",
      },
      gridTemplateRows: {
        layout: "80px 1fr 80px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
