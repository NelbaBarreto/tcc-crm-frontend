module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        lila: {
          400: "#604fcd",
          700: "#1E40AF",
          500: "#130b43",
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
