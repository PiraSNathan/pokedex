import { Handlers, PageProps } from "$fresh/server.ts";
import Pokemons from "../../islands/pokemons.tsx";

interface PokemonData {
  name: string;
  url: string;
}

interface DataPokemon {
  results: PokemonData[];
}

export const handler: Handlers<DataPokemon> = {
  async GET(req, ctx) {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=600`,
    );
    const resBody = await res.json();
    const results: PokemonData[] = resBody.results;
    return ctx.render({ results });
  },
};

export default function MyPage(props: PageProps) {
  return (
    <>
      <Pokemons pokemons={props.data.results} />
    </>
  );
}
