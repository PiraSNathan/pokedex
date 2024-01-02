import { useState } from "preact/hooks";

interface PokemonData {
  name: string;
  url: string;
}

interface SearchProps {
  pokemons: PokemonData[];
  filterPokemons: () => PokemonData[];
}

export default function Search(props: SearchProps) {
  const [query, setQuery] = useState();
  //   const [pokemonsState, setPokemonsState] = useState<>();

  return (
    <form>
      <input type="text" name="q" value={query} />
      <button type="submit">Search</button>
    </form>
  );
}
