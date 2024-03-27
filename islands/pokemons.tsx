import { IType, ITypePokemon } from "npm:pokeapi-typescript";
import { useEffect, useState } from "preact/hooks";
import { getPokemonIndex } from "../util/index.tsx";

interface PokemonData {
  name: string;
  url: string;
}

interface Props {
  pokemons: PokemonData[];
}

export default function Pokemons(props: Props) {
  const [pokemons, setPokemons] = useState<PokemonData[]>(props.pokemons);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterOption, setFilterOption] = useState<string>(
    "none",
  );

  const tags = [
    "Fire",
    "Water",
    "Grass",
    "Poison",
    "Bug",
    "Normal",
    "Flying",
    "Electric",
    "Ground",
    "Fairy",
    "Fighting",
    "Psychic",
    "Rock",
    "Steel",
    "Ice",
    "Ghost",
    "Dragon",
    "Dark",
  ];

  useEffect(() => {
    if (filterOption === "none") {
      if (JSON.stringify(pokemons) === JSON.stringify(props.pokemons)) return;
      setPokemons(props.pokemons);
      return;
    }

    (async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/type/${filterOption.toLowerCase()}`,
      );
      const resBody: IType = await res.json();
      // Extract the data and put into an array of type PokemonData.
      const filteredPokemons: PokemonData[] = resBody.pokemon.map(
        (pokemon: ITypePokemon) => {
          return {
            name: pokemon.pokemon.name,
            url: pokemon.pokemon.url,
          };
        },
      );
      setPokemons(filteredPokemons);
    })();
  }, [filterOption]);

  const getFormattedIndexNumber = (url: string) => {
    const pokemonIndex = getPokemonIndex(url);
    return pokemonIndex.padStart(3, "0");
  };

  const dropdownFilter = (
    <div class="relative inline-flex">
      <svg
        class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 412 232"
      >
        <path
          d="M406.8 0L0 0 206 231.6 412 0 406.8 0z"
          fill="currentColor"
        />
      </svg>
      <select
        class="border border-gray-300 rounded text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
        onClick={(e: any) => {
          const value = e.target?.value;
          setFilterOption(value);
        }}
      >
        <option value="none">Filter by type</option>
        {tags.map((tag) => <option>{tag}</option>)}
      </select>
    </div>
  );

  if (pokemons.length === 0) return <div>Loading...</div>;
  return (
    <div className="p-8 space-y-4 w-full max-w-[900px] m-auto">
      <div className="flex flex-cols w-full space-x-6 justify-end">
        {/* Search input */}
        <input
          type="text"
          className="w-44 p-2 rounded-full border border-gray-300 text-xs text-center"
          placeholder="Search for a pokemon"
          // ...
          onInput={(e: any) => setSearchQuery(e.target?.value)}
        />
        {/* Dropdown filter */}
        {dropdownFilter}
      </div>
      <ul class="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {pokemons.filter((pokemon, index) => {
          if (searchQuery === "") return true;
          return pokemon.name.startsWith(searchQuery.toLowerCase());
        }).map((pokemon, index) => {
          return (
            <li className="bg-gray-200 flex items-center justify-around p-1 rounded-sm">
              <a
                href={`/pokemons/${getPokemonIndex(pokemon.url)}`}
                class="flex flex-col px-2"
              >
                <span class="self-end">
                  #{getFormattedIndexNumber(pokemon.url)}
                </span>
                <div
                  className="w-full h-auto bg-cover flex justify-around items-center"
                  style={{
                    backgroundImage: `url('/pokeball.svg')`,
                  }}
                >
                  {
                    <div>
                      <img
                        class="w-28 h-auto mx-auto"
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                          getPokemonIndex(pokemon.url)
                        }.png`}
                        alt={pokemon.name}
                      />
                    </div>
                  }
                </div>
                <span class="self-center capitalize">
                  {pokemon.name}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
