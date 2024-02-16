import { useEffect, useState } from "preact/hooks";
import { h } from "preact";
import { Button } from "../components/Button.tsx";
import { FastAverageColor } from "npm:fast-average-color";
import { darken, lighten } from "npm:polished";
import {
  IEvolutionChain,
  IPokemon,
  IPokemonSpecies,
  IPokemonStat,
} from "npm:pokeapi-typescript";
import BarChart from "../components/BarChart.tsx";

interface Props {
  index: number | string;
  pokemonName: string;
  className?: string;
  pokemonSpecies: IPokemonSpecies;
  pokemonInformation: IPokemon;
  pokeEvolutions?: string[];
}

export default function PokemonContent(props: Props) {
  const [pokeIndex, setPokeIndex] = useState<number>(Number(props.index));
  const [indexNumber, setIndexNumber] = useState<number>(0);
  const [lightColor, setLightColor] = useState<string>("");

  useEffect(() => {
    const container = document.querySelector("img");
    const pokemonTile = document.querySelector(
      "#pokemon-tile",
    ) as HTMLDivElement;
    // const evolutionTile = document.querySelector(
    //   "#evolution-tile",
    // ) as HTMLDivElement;
    const divs = document.querySelectorAll(".evolution-tile") as NodeListOf<
      HTMLDivElement
    >;
    const fac = new FastAverageColor();
    if (container === null || pokemonTile === null) return;
    fac.getColorAsync(container)
      .then((color) => {
        console.log(color.rgba);
        // console.log(darken(1, color.rgba));

        const light = lighten(0.1, color.rgb);
        const lighterColor = lighten(0.175, color.rgb);
        console.log(light);
        setLightColor(lighten(0.175, color.rgb));
        console.log(lightColor);
        pokemonTile.style.background = color.rgba;
        pokemonTile.style.background =
          `linear-gradient(180deg, ${color.rgba} 0%, ${light} 100%)`;
        divs.forEach((evolutionTile) => {
          evolutionTile.style.background = lightColor;
          evolutionTile.style.background =
            `linear-gradient(180deg, ${light} 0%, ${lighterColor} 100%)`;
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [indexNumber]);

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
                indexNumber === 0 && "z-10 !bg-white"
              } bg-gray-200 p-2 rounded-tl-lg rounded-tr-lg`}
            >
              General
            </button>
            <button
              onClick={() => handleClickOnIndex(1)}
              className={`${
                indexNumber === 1 && "z-10 !bg-white"
              } bg-gray-200 p-2 rounded-tl-lg rounded-tr-lg `}
            >
              Moves & Abilities
            </button>
          </div>
        </div>
      </div>
      <div className={`grow h-full mx-5 relative`}>
        <div className={`w-full h-full`}>
          {indexNumber === 0 && (
            <div>
              {/* General information */}
              <div className={"flex flex-col space-y-4"}>
                <div className="py-4 flex flex-row flex-wrap m-auto">
                  {props.pokemonInformation.types.map(
                    (type: any, i: number) => {
                      return (
                        <div className="capitalize mr-1">
                          {type.type.name}
                          {i === props.pokemonInformation.types.length - 1
                            ? ""
                            : ","}
                        </div>
                      );
                    },
                  )}
                </div>
                <div className={"divide-y h-0.5 bg-gray-400 w-1/2 m-auto"} />
                <p className="py-4 capitalize m-auto text-center">
                  <p>
                    {props.pokemonSpecies.flavor_text_entries.find((entry) =>
                      entry.language.name === "en"
                    )?.flavor_text.replace("[^a-zA-Z\s]+", "")}
                  </p>
                </p>
                <div className={"divide-y h-0.5 bg-gray-400 w-1/2 m-auto"} />
                <div className={"flex"}>
                  <p className="py-4 flex items-center space-x-2 m-auto">
                    <i className="material-icons
                  ">
                      favorite
                    </i>
                    <span>
                      {props.pokemonInformation.weight / 10} kg
                    </span>
                  </p>
                  <p className="py-4 flex items-center space-x-2 m-auto">
                    <i className="material-icons">favorite</i>
                    <span>
                      {props.pokemonInformation.height / 10} m
                    </span>
                  </p>
                </div>
              </div>
              {/* Evolution Chain */}
              <div>
                <h2 className="font-semibold text-3xl mb-4 mt-2">Evolution</h2>
                <div className={"flex justify-between"}>
                  {props.pokeEvolutions &&
                    props.pokeEvolutions.map((ev: string, index: number) => {
                      return (
                        <div
                          className={`evolution-tile p-2 rounded-full`}
                        >
                          <img
                            class="w-24 h-24 mx-auto"
                            src={`https://img.pokemondb.net/sprites/home/normal/1x/${ev}.png`}
                            alt="the Fresh logo: a sliced lemon dripping with juice"
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
          {indexNumber === 1 && (
            <>
              {props.pokemonInformation.stats.map((stat: IPokemonStat) => {
                return (
                  <div
                    className={"flex flex-row items-center justify-between p-3"}
                  >
                    <p className={"capitalize"}>{stat.stat.name}</p>
                    <div className={"flex flex-row items-center space-x-2"}>
                      <BarChart
                        value={stat.base_stat}
                        colour={`${lightColor}`}
                      />
                      <p className={"w-7 text-right"}>{stat.base_stat}</p>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        {/* Navigationbuttons */}
        <div
          className={"w-full flex justify-start absolute bottom-0 py-4 space-x-4"}
        >
          {pokeIndex !== 1 && (
            <Button
              id="btn"
              onClick={() => handleClick(-1)}
              className={"bg-gray-100 rounded-full flex items-center justify-center w-12 h-12"}
            >
              <span
                className="material-icons-outlined w-12 h-12"
                style={{ fontSize: "48px" }}
              >
                chevron_left
              </span>
            </Button>
          )}

          {pokeIndex !== 1100 &&
            (
              <Button
                onClick={() => handleClick(1)}
                className={"bg-gray-100 rounded-full flex items-center justify-center w-12 h-12"}
              >
                <span
                  className="material-icons-outlined w-12 h-12"
                  style={{ fontSize: "48px" }}
                >
                  chevron_right
                </span>
              </Button>
            )}
        </div>
      </div>
    </>
  );
}
