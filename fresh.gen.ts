// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $index from "./routes/index.tsx";
import * as $pokemons_id_ from "./routes/pokemons/[id].tsx";
import * as $pokemons_index from "./routes/pokemons/index.tsx";
import * as $pokemonContent from "./islands/pokemonContent.tsx";
import * as $pokemons from "./islands/pokemons.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/index.tsx": $index,
    "./routes/pokemons/[id].tsx": $pokemons_id_,
    "./routes/pokemons/index.tsx": $pokemons_index,
  },
  islands: {
    "./islands/pokemonContent.tsx": $pokemonContent,
    "./islands/pokemons.tsx": $pokemons,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
