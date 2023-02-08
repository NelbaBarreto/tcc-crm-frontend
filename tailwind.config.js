module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        "deep-purple": {
          50: "#EDE7F6",
          100: "#D1C4E9",
          200: "#B39DDB",
          300: "#9575CD",
          400: "#7E57C2",
          500: "#673AB7",
          600: "#5E35B1",
          700: "#512DA8",
          800: "#4527A0",
          900: "#311B92",
          "a100": "#B388FF",
          "a200": "#7C4DFF",
          "a400": "#651FFF",
          "a700": "#6200EA"
        }
      },
      gridTemplateColumns: {
        layout: "18rem 1fr",
      },
      gridTemplateRows: {
        layout: "80px 1fr 80px",
      },
      boxShadow: {
        "3xl": "3px 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
