import { Handlers, PageProps } from "$fresh/server.ts";

interface PokemonData {
  name: string;
  url: string;
}

interface DataPokemon {
  results: PokemonData[];
  query: string;
}

export const handler: Handlers<DataPokemon> = {
  async GET(req, ctx) {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=1100`,
    );
    const resBody = await res.json();
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    const results: PokemonData[] | [] = resBody.results.filter((
      poke: PokemonData,
    ) => poke.name.startsWith(query));
    return ctx.render({ results, query });
  },
};

const getIndexNumber = (url: string) => {
  const number = url.split("/");
  return number[6].toString().padStart(3, "0");
};

export default function MyPage(props: PageProps<DataPokemon>) {
  return (
    <>
      {
        <form>
          <input type="text" name="q" value={props.data.query}>
          </input>
          <button type="submit">Search</button>
        </form>
      }
      {/* <Search pokemons={props.data.results} filterPokemons={}></Search> */}
      <ul class="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {props.data.results.map((pokemon, index) => {
          return (
            <li class="bg-gray-100 w-32">
              <a
                href={`/pokemons/${index + 1}`}
                class="flex flex-col px-2"
              >
                <span class="self-end">
                  #{getIndexNumber(pokemon.url)}
                </span>
                <div
                  class="w-28 h-28 bg-cover"
                  style={{
                    backgroundImage: `url('/pokeball.svg')`,
                  }}
                >
                  {
                    // <img
                    //   class="my-6"
                    //   src="/pokeball.svg"
                    //   width="128"
                    //   height="128"
                    //   alt="the Fresh logo: a sliced lemon dripping with juice"
                    // />
                  }
                  {
                    <div>
                      <img
                        class="w-24 h-24 mx-auto"
                        src={`https://img.pokemondb.net/sprites/home/normal/1x/${pokemon.name}.png`}
                        alt="the Fresh logo: a sliced lemon dripping with juice"
                      />
                    </div>
                  }
                </div>
                <span class="self-center">
                  {pokemon.name}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
