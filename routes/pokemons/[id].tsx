import { Handlers, PageProps } from "$fresh/server.ts";
import PokemonContent from "../../islands/pokemonContent.tsx";
import {
  IEvolutionChain,
  IPokemon,
  IPokemonSpecies,
} from "npm:pokeapi-typescript";
import { getPokemonIndex } from "../../util/index.tsx";

interface PokemonDetails {
  id: number;
  pokemonSpecies: IPokemonSpecies;
  pokeEvolutions?: string[];
  pokemonInformation: IPokemon;
}

interface ErrorMessage {
  message: string;
}

export const handler: Handlers<PokemonDetails | ErrorMessage> = {
  async GET(req, ctx) {
    if (!Number(ctx.params.id)) {
      return ctx.render({ message: "Pokemon not found." });
    }
    if (Number(ctx.params.id) <= 0 || Number(ctx.params.id) > 1000) {
      return ctx.render({
        message: "In this Pokédex only the first 1000 Pokémons will be shown.",
      });
    }
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${ctx.params.id}`,
    );
    const pokemonInformation: IPokemon = await getPokemonInformation(
      ctx.params.id,
    );
    const id = Number(ctx.params.id);
    const pokemonSpecies: IPokemonSpecies = await res.json();
    const pokeEvolutions = await getEvolutionChain(
      pokemonSpecies.evolution_chain.url,
    );
    return ctx.render({
      id,
      pokemonSpecies,
      pokeEvolutions,
      pokemonInformation,
    });
  },
};

const getPokemonInformation = async (id: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemonInformation: IPokemon = await res.json();
  return pokemonInformation;
};

const getEvolutionChain = async (url: string) => {
  const evolutionChainPokemons: string[] = [];
  const res = await fetch(url);
  const evolutionChain: IEvolutionChain = await res.json();
  if (evolutionChain.chain.evolves_to.length === 0) return [];
  let current = evolutionChain.chain.evolves_to;
  evolutionChainPokemons.push(
    getPokemonIndex(evolutionChain.chain.species.url),
  );
  while (current !== null) {
    if (current[0] === undefined) return evolutionChainPokemons;
    evolutionChainPokemons.push(getPokemonIndex(current[0].species.url));
    current = current[0].evolves_to;
  }
};

export default function Pokemons(props: PageProps) {
  if ("message" in props.data) {
    return (
      <div className="flex justify-center items-center content-center p-4">
        {props.data.message}
      </div>
    );
  }
  if (props.data.id <= 0 || props.data.id > 1000) return <div>I dont show</div>;
  return (
    <PokemonContent
      index={props.data.pokemonInformation.id}
      pokemonName={props.data.pokemonSpecies.name}
      pokemonInformation={props.data.pokemonInformation}
      pokemonSpecies={props.data.pokemonSpecies}
      pokeEvolutions={props.data.pokeEvolutions}
    >
    </PokemonContent>
  );
}
