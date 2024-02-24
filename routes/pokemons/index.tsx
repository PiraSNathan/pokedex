import { Handlers, PageProps } from "$fresh/server.ts";
import Pokemons from "../../islands/pokemons.tsx";

interface PokemonData {
  name: string;
  url: string;
}

interface DataPokemon {
  results: PokemonData[];
  query: string;
}

export default function MyPage() {
  return (
    <>
      <Pokemons />
    </>
  );
}
