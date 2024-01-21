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
    },
  },
} satisfies Config;
