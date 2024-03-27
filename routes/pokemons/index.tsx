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
      `https://pokeapi.co/api/v2/pokemon/?limit=1000`,
    );
    const resBody = await res.json();
    const results: PokemonData[] = resBody.results;
    return ctx.render({ results });
  },
};

export default function MyPage(props: PageProps) {
  return (
    <div className="flex flex-col text-center">
      <h1 className="text-2xl mt-8 font-semibold text-blue-500">Pokémons</h1>
      <Pokemons pokemons={props.data.results} />
    </div>
  );
}
