import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        tab: "0 0px 30px -2px rgb(0,0,0, 0.5)",
      },
      fontFamily: {
        pokemonNameB: ["Pixelify Sans", "sans-serif"],
      },
      colors: {
        "bug": "#0D8C12",
        "dark": "#291955",
        "dragon": "#6FAB95",
        "electric": "#FEE250",
        "fairy": "#F78ACC",
        "fire": "#ED4D4D",
        "fighting": "#FE6550",
        "flying": "#3797DE",
        "ghost": "#6855B5",
        "grass": "#69BF5B",
        "ground": "#8C4F3C",
        "ice": "#8AC6E0",
        "normal": "#ABABAB",
        "poison": "#C950A7",
        "psychic": "#6533A4",
        "rock": "#828282",
        "steel": "#4B4B4B",
        "water": "#66CAF4",
      },
    },
  },
} satisfies Config;
