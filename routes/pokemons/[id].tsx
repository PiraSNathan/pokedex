import { Handlers, PageProps } from "$fresh/server.ts";
import PokemonContent from "../../islands/pokemonContent.tsx";
import {
  IEvolutionChain,
  IPokemonSpecies,
  IPokemonStat,
} from "npm:pokeapi-typescript";

interface PokemonDetails {
  id: number;
  pokemonSpecies: IPokemonSpecies;
  pokeEvolutions?: string[];
  stats: IPokemonStat[];
}

export const handler: Handlers<PokemonDetails> = {
  async GET(req, ctx) {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${ctx.params.id}`,
    );
    const stats: IPokemonStat[] = await getStatsOfPokemon(ctx.params.id);
    const id = Number(ctx.params.id);
    const pokemonSpecies: IPokemonSpecies = await res.json();
    const pokeEvolutions = await getEvolutionChain(
      pokemonSpecies.evolution_chain.url,
    );
    return ctx.render({ id, pokemonSpecies, pokeEvolutions, stats });
  },
};

const getStatsOfPokemon = async (id: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const statS = await res.json();
  return statS.stats;
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
    <div>
      {
        /* pokemon index
      <div
        className={"flex flex-col mt-3 mb-4 font-semibold text-2xl items-center"}
      >
        {props.params.id}
      </div> */
      }
      {/* pokemon name and image */}
      {
        /* <div
        id="pokemon-tile"
        className={"flex flex-col items-center text-[#545454] pokemonName mx-5 pt-8 rounded-tl-3xl rounded-tr-3xl text-4xl"}
      >
        {props.data.pokemonSpecies.name}
        <img
          crossOrigin="anonymous"
          class="w-52 h-52 mx-auto mb-16"
          // src={`https://img.pokemondb.net/sprites/home/normal/1x/${props.data.pokemonSpecies.name}.png`}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.params.id}.png`}
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
      </div> */
      }
      <PokemonContent
        index={props.params.id}
        pokemonName={props.data.pokemonSpecies.name}
        className=""
      >
        {/* evolutionchain */}
        <div className={"flex"}>
          {props.data.pokeEvolutions &&
            props.data.pokeEvolutions.map((ev: string, index: number) => {
              return (
                <img
                  class="w-24 h-24 mx-auto"
                  src={`https://img.pokemondb.net/sprites/home/normal/1x/${ev}.png`}
                  alt="the Fresh logo: a sliced lemon dripping with juice"
                />
              );
            })}
        </div>
        {/* stats */}
        <div className={"flex flex-col"}>
          {props.data.stats.map((stat: IPokemonStat) => {
            return (
              <div className={"flex"}>
                <p>{stat.stat.name}</p>
                <p>{stat.base_stat}</p>
              </div>
            );
          })}
        </div>
      </PokemonContent>
    </div>
  );
}
