import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { FastAverageColor } from "npm:fast-average-color";
import { lighten } from "npm:polished";
import {
  IPokemon,
  IPokemonSpecies,
  IPokemonStat,
} from "npm:pokeapi-typescript";
import BarChart from "../components/BarChart.tsx";
import Tag from "../components/Tag.tsx";

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
    const pokemonTileBig = document.querySelector(
      "#pokemon-tile-big",
    ) as HTMLDivElement;

    const divs = document.querySelectorAll(".evolution-tile") as NodeListOf<
      HTMLDivElement
    >;
    const fac = new FastAverageColor();
    if (container === null || pokemonTile === null) return;
    fac.getColorAsync(container)
      .then((color) => {
        const light = lighten(0.1, color.rgb);
        const lighterColor = lighten(0.175, color.rgb);
        setLightColor(lighten(0.175, color.rgb));
        pokemonTile.style.background = color.rgba;
        pokemonTileBig.style.background = color.rgba;
        pokemonTile.style.background =
          `linear-gradient(180deg, ${color.rgba} 0%, ${light} 100%)`;
        pokemonTileBig.style.background =
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
    const pokemonIndex = Number(props.index) + value;
    setPokeIndex(pokemonIndex);
    window.location.href = `/pokemons/${pokemonIndex}`;
  };

  const handleClickOnTab = (value: number) => {
    setIndexNumber(value);
  };

  const convertToProperSentence = (str: string | undefined) => {
    if (str === undefined) return "";
    const properSentence = str.replace(/[\x00-\x1F\x7F-\x9F]/g, " ").replace(
      "POKéMON",
      "Pokémon",
    );
    return properSentence;
  };

  return (
    <>
      {/* Mobile View */}
      <div className={"md:hidden"}>
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
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.index}.png`}
              alt="the Fresh logo: a sliced lemon dripping with juice"
            />
            <div
              className={`flex absolute bottom-0 flex-row justify-center text-2xl font-sans space-x-1 text-black`}
            >
              <button
                onClick={() => handleClickOnTab(0)}
                className={`${
                  indexNumber === 0 && "z-10 !bg-white"
                } bg-gray-200 p-2 rounded-tl-lg rounded-tr-lg`}
              >
                General
              </button>
              <button
                onClick={() => handleClickOnTab(1)}
                className={`${
                  indexNumber === 1 && "z-10 !bg-white"
                } bg-gray-200 p-2 rounded-tl-lg rounded-tr-lg `}
              >
                Moves & Abilities
              </button>
            </div>
          </div>
        </div>
        <div className={`grow h-full mx-5 relative mt-4`}>
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
                            <Tag name={type.type.name} />
                          </div>
                        );
                      },
                    )}
                  </div>
                  <div className={"divide-y h-0.5 bg-gray-400 w-full m-auto"} />
                  <p className="py-4 m-auto text-center">
                    <p className={"text-xl"}>
                      {convertToProperSentence(
                        props.pokemonSpecies.flavor_text_entries.find((entry) =>
                          entry.language.name === "en"
                        )?.flavor_text,
                      )}
                    </p>
                  </p>
                  <div className={"divide-y h-0.5 bg-gray-400 w-full m-auto"} />
                  <div className={"flex"}>
                    <p className="py-4 flex items-center space-x-2 m-auto">
                      <span
                        className="material-symbols-outlined"
                        style={{ "fontSize": "52px" }}
                      >
                        weight
                      </span>
                      <span className={"text-xl"}>
                        {props.pokemonInformation.weight / 10} kg
                      </span>
                    </p>
                    <p className="py-4 flex items-center space-x-2 m-auto">
                      <span
                        class="material-symbols-outlined"
                        style={{ "fontSize": "52px" }}
                      >
                        height
                      </span>
                      <span className={"text-xl"}>
                        {props.pokemonInformation.height / 10} m
                      </span>
                    </p>
                  </div>
                </div>
                {/* Evolution Chain */}
                {props.pokeEvolutions?.length !== 0 && (
                  <div>
                    <h2 className="font-semibold text-3xl mb-4 mt-2">
                      Evolution
                    </h2>
                    <div className={"flex justify-between"}>
                      {props.pokeEvolutions &&
                        props.pokeEvolutions.map(
                          (evolvesToPokemonIndex: string) => {
                            return (
                              <a href={`/pokemons/${evolvesToPokemonIndex}`}>
                                <div
                                  className={`evolution-tile p-2 rounded-full`}
                                >
                                  <img
                                    class="w-24 h-24 mx-auto"
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolvesToPokemonIndex}.png`}
                                    alt="the Fresh logo: a sliced lemon dripping with juice"
                                  />
                                </div>
                              </a>
                            );
                          },
                        )}
                    </div>
                  </div>
                )}
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
                className={"bg-gray-100 rounded-full flex items-center justify-center w-12 h-12 shadow-xl border-[0.5px] border-black"}
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
                  className={"bg-gray-100 rounded-full flex items-center justify-center w-12 h-12 shadow-xl border-[0.5px] border-black"}
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
      </div>
      {/* Desktop View */}
      <div className="hidden md:block w-[900px] m-auto">
        <div className={"flex flex-row"}>
          {/* Left side */}
          <div
            id="pokemon-tile-big"
            className={"flex capitalize font-semibold flex-col items-center text-[#545454] pt-8 rounded-tl-3xl rounded-bl-3xl text-4xl w-2/5"}
          >
            <p>{props.index}</p>
            <img
              crossOrigin="anonymous"
              class="w-52 h-52 mx-auto"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.index}.png`}
              alt="the Fresh logo: a sliced lemon dripping with juice"
            />
            <div className=" flex flex-row flex-wrap m-auto">
              {props.pokemonInformation.types.map(
                (type: any, i: number) => {
                  return (
                    <div className="capitalize mr-1">
                      <Tag name={type.type.name} />
                    </div>
                  );
                },
              )}
            </div>
            <div className={"flex"}>
              <p className="py-4 flex items-center space-x-2 m-auto">
                <span
                  className="material-symbols-outlined"
                  style={{ "fontSize": "32px" }}
                >
                  weight
                </span>
                <span className={"text-xl"}>
                  {props.pokemonInformation.weight / 10} kg
                </span>
              </p>
              <p className="py-4 flex items-center space-x-2 m-auto">
                <span
                  class="material-symbols-outlined"
                  style={{ "fontSize": "32px" }}
                >
                  height
                </span>
                <span className={"text-xl"}>
                  {props.pokemonInformation.height / 10} m
                </span>
              </p>
            </div>
          </div>
          {/* Right side */}
          <div className="rounded-tr-3xl rounded-br-3xl border-t-2 border-b-2 border-r-2 border-gray-300 w-3/5 m-auto ">
            <div
              className={" flex flex-col p-4"}
            >
              <h2
                className={"capitalize font-pokemonNameB text-2xl text-center"}
              >
                {props.pokemonName}
              </h2>
              <p className="py-4 m-auto text-center">
                <p className={"text-md"}>
                  {convertToProperSentence(
                    props.pokemonSpecies.flavor_text_entries.find((entry) =>
                      entry.language.name === "en"
                    )?.flavor_text,
                  )}
                </p>
              </p>
              <div>
                <h2 className="font-semibold text-xl mb-4 mt-2">
                  Base Stats
                </h2>
                <div className="pr-10">
                  {props.pokemonInformation.stats.map((stat: IPokemonStat) => {
                    return (
                      <div
                        className={"flex flex-row items-center justify-between"}
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
                </div>
              </div>

              {props.pokeEvolutions?.length !== 0 && (
                <div>
                  <h2 className="font-semibold text-xl mb-4 mt-2">
                    Evolution
                  </h2>
                  <div className={"flex space-x-4 w-full"}>
                    {props.pokeEvolutions &&
                      props.pokeEvolutions.map(
                        (evolvesToPokemonIndex: string) => {
                          return (
                            <a href={`/pokemons/${evolvesToPokemonIndex}`}>
                              <div
                                className={`evolution-tile p-2 rounded-full`}
                              >
                                <img
                                  class="w-20 h-20 mx-auto"
                                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolvesToPokemonIndex}.png`}
                                  alt="the Fresh logo: a sliced lemon dripping with juice"
                                />
                              </div>
                            </a>
                          );
                        },
                      )}
                  </div>
                </div>
              )}
              <div
                className={"w-full flex justify-start bottom-0 justify-end space-x-4"}
              >
                {pokeIndex !== 1 && (
                  <Button
                    id="btn"
                    onClick={() => handleClick(-1)}
                    className={"bg-gray-100 rounded-full flex items-center justify-center w-12 h-12 shadow-xl border-[0.5px] border-black"}
                  >
                    <span
                      className="material-icons-outlined w-10 h-10"
                      style={{ fontSize: "40px" }}
                    >
                      chevron_left
                    </span>
                  </Button>
                )}

                {pokeIndex !== 1100 &&
                  (
                    <Button
                      onClick={() => handleClick(1)}
                      className={"bg-gray-100 rounded-full flex items-center justify-center w-12 h-12 shadow-xl border-[0.5px] border-black"}
                    >
                      <span
                        className="material-icons-outlined w-10 h-10"
                        style={{ fontSize: "40px" }}
                      >
                        chevron_right
                      </span>
                    </Button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
