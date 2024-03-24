import { Handlers, PageProps } from "$fresh/server.ts";
import PokemonContent from "../../islands/pokemonContent.tsx";
import {
  IEvolutionChain,
  IPokemon,
  IPokemonSpecies,
} from "npm:pokeapi-typescript";

interface PokemonDetails {
  id: number;
  pokemonSpecies: IPokemonSpecies;
  pokeEvolutions?: string[];
  pokemonInformation: IPokemon;
}

export const handler: Handlers<PokemonDetails> = {
  async GET(req, ctx) {
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
  evolutionChainPokemons.push(evolutionChain.chain.species.name);
  while (current !== null) {
    if (current[0] === undefined) return evolutionChainPokemons;
    evolutionChainPokemons.push(current[0].species.name);
    current = current[0].evolves_to;
  }
};

export default function Pokemons(props: PageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <PokemonContent
        index={props.data.pokemonInformation.id}
        pokemonName={props.data.pokemonSpecies.name}
        pokemonInformation={props.data.pokemonInformation}
        pokemonSpecies={props.data.pokemonSpecies}
        pokeEvolutions={props.data.pokeEvolutions}
      >
      </PokemonContent>
    </div>
  );
}
