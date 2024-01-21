import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { FastAverageColor } from "npm:fast-average-color";
import { darken, lighten } from "npm:polished";
import { JSX } from "preact/jsx-runtime";
interface Props {
  index: number | string;
  pokemonName: string;
  children: JSX.Element[];
  className?: string;
}

export default function PokemonContent(props: Props) {
  const [pokeIndex, setPokeIndex] = useState<number>(Number(props.index));
  const [indexNumber, setIndexNumber] = useState<number>(0);

  useEffect(() => {
    const container = document.querySelector("img");
    const pokemonTile = document.querySelector(
      "#pokemon-tile",
    ) as HTMLDivElement;
    const fac = new FastAverageColor();
    if (container === null || pokemonTile === null) return;
    fac.getColorAsync(container)
      .then((color) => {
        console.log(color.rgba);
        console.log(darken(1, color.rgba));

        const light = lighten(0.1, color.rgb);
        pokemonTile.style.background = color.rgba;
        pokemonTile.style.background =
          `linear-gradient(180deg, ${color.rgba} 0%, ${light} 100%)`;
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleClick = (value: number) => {
    const tmp = Number(props.index) + value;
    setPokeIndex(tmp);
    window.location.href = `/pokemons/${tmp}`;
  };

  const handleClickOnIndex = (value: number) => {
    setIndexNumber(value);
  };

  return (
    <>
      <div>
        {/* pokemon index */}
        <div
          className={"flex flex-col mt-3 mb-4 font-semibold text-2xl items-center"}
        >
          {props.index}
        </div>
        <div
          id="pokemon-tile"
          className={"flex font-pokemonNameB capitalize font-semibold relative flex-col items-center text-[#545454] mx-5 pt-8 rounded-tl-3xl rounded-tr-3xl text-4xl"}
        >
          {props.pokemonName}
          <img
            crossOrigin="anonymous"
            class="w-52 h-52 mx-auto mb-16"
            // src={`https://img.pokemondb.net/sprites/home/normal/1x/${props.data.pokemonSpecies.name}.png`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.index}.png`}
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />
          <div
            className={`flex absolute bottom-0 flex-row justify-center text-2xl font-sans space-x-1 text-black`}
          >
            {/* 0 0px 20px -2px rgb(0 0 0 / 1) */}
            <button
              onClick={() => handleClickOnIndex(0)}
              className={`${
                indexNumber === 0 && "shadow-tab z-10 !bg-white"
              } bg-gray-100 p-2 rounded-tl-lg rounded-tr-lg`}
            >
              General
            </button>
            <button
              onClick={() => handleClickOnIndex(1)}
              className={`${
                indexNumber === 1 && "shadow-tab z-10 !bg-white"
              } bg-gray-100 p-2 rounded-tl-lg rounded-tr-lg `}
            >
              Moves & Abilities
            </button>
          </div>
        </div>
      </div>
      <div className={`${props.className} z-10 relative`}>
        <div className={`w-full absolute top-0 bg-white`}>
          {props.children[indexNumber]}
          <div>
            {pokeIndex !== 1 && (
              <Button
                id="btn"
                onClick={() => handleClick(-1)}
              >
                zurück
              </Button>
            )}

            {pokeIndex !== 1100 &&
              (
                <Button onClick={() => handleClick(1)}>
                  weiter
                </Button>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
