import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { FastAverageColor } from "npm:fast-average-color";
import { lighten } from "npm:polished";
import {
  IPokemon,
  IPokemonSpecies,
  IPokemonStat,
  IPokemonType,
} from "npm:pokeapi-typescript";
import BarChart from "../components/BarChart.tsx";
import Tag from "../components/Tag.tsx";
import { getFormattedIndexNumber } from "../util/index.tsx";

interface Props {
  index: string;
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

  const evoChain = (
    <div>
      <h2 className="font-semibold text-3xl md:text-xl mb-4 mt-2">
        Evolution
      </h2>
      <div
        className={"flex justify-between md:justify-normal md:w-full md:space-x-4"}
      >
        {props.pokeEvolutions &&
          props.pokeEvolutions.map(
            (evolvesToPokemonIndex: string) => {
              return (
                <a href={`/pokemons/${evolvesToPokemonIndex}`}>
                  <div
                    className={`evolution-tile p-2 rounded-full`}
                  >
                    <img
                      className="w-24 h-24 mx-auto"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolvesToPokemonIndex}.png`}
                      alt="pokemon picture"
                    />
                  </div>
                </a>
              );
            },
          )}
      </div>
    </div>
  );

  const navigationButtons = (
    <div
      className={"w-full flex justify-end pb-4 space-x-4 px-5"}
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

      {pokeIndex !== 1000 &&
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
  );

  const baseStat = (name: string, value: number) => {
    return (
      <div
        className={"flex flex-row items-center justify-between p-3 md:p-0"}
      >
        <p className={"capitalize"}>{name}</p>
        <div className={"flex flex-row items-center space-x-2"}>
          <BarChart
            value={value}
            colour={`${lightColor}`}
          />
          <p className={"w-7 text-right"}>{value}</p>
        </div>
      </div>
    );
  };

  const pokemonImage = (
    <img
      crossOrigin="anonymous"
      className="w-52 h-52 md:w-80 md:h-80 mx-auto mb-16 md:mx-0 md:mb-0"
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.index}.png`}
      alt={props.pokemonName}
    />
  );

  return (
    <div className="flex min-h-screen justify-center items-center content-center flex-col">
      {/* Mobile view */}
      <div
        className={"h-full min-h-screen items-stretch flex flex-col md:hidden"}
      >
        {/* Top part */}
        <div>
          {/* pokemon index */}
          <div
            className={"flex flex-col mt-3 mb-4 font-semibold text-2xl items-center"}
          >
            {getFormattedIndexNumber(props.index.toString(), false)}
          </div>
          <div
            id="pokemon-tile"
            className={"flex font-pokemonNameFont capitalize font-semibold relative flex-col items-center text-[#545454] mx-5 pt-8 rounded-tl-3xl rounded-tr-3xl text-4xl"}
          >
            {props.pokemonName}
            {pokemonImage}
            <div
              className={`flex absolute bottom-0 flex-row justify-center text-2xl font-sans space-x-1 text-[#061d43]`}
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
                Base Stats
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
                      (type: IPokemonType) => {
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
                        className="material-symbols-outlined"
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
                {props.pokeEvolutions?.length !== 0 && evoChain}
              </div>
            )}
            {indexNumber === 1 && (
              <>
                {props.pokemonInformation.stats.map((stat: IPokemonStat) => {
                  return baseStat(stat.stat.name, stat.base_stat);
                })}
              </>
            )}
          </div>
        </div>
        {/* Navigationbuttons */}
        {navigationButtons}
      </div>
      {/* Desktop view */}
      <div
        className={"hidden md:flex flex-row mt-10"}
      >
        {/* Left side */}
        <div
          id="pokemon-tile-big"
          className={"flex relative capitalize font-semibold flex-col items-center text-[#545454] pt-8 rounded-tl-3xl rounded-bl-3xl text-4xl w-2/5 flex-1"}
        >
          <a
            href={"/pokemons"}
            className="absolute start-0 -top-8 text-sm flex items-center text-[#061d43]"
          >
            <span
              className="material-icons-outlined"
              style={{ fontSize: "18px" }}
            >
              chevron_left
            </span>
            Go back to overview
          </a>
          <p>{getFormattedIndexNumber(props.index.toString(), false)}</p>
          {pokemonImage}
          <div className="flex flex-row flex-wrap">
            {props.pokemonInformation.types.map(
              (type: IPokemonType) => {
                return (
                  <div className="capitalize mr-1">
                    <Tag name={type.type.name} />
                  </div>
                );
              },
            )}
          </div>
          <div className={"flex space-x-2"}>
            <p className="py-4 flex items-center space-x-1 m-auto">
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
            <p className="py-4 flex items-center space-x-0 m-auto">
              <span
                className="material-symbols-outlined"
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
        <div className="rounded-tr-3xl rounded-br-3xl border-t-2 border-b-2 border-r-2 border-gray-300 w-3/5 flex-1">
          <div
            className={" flex flex-col py-4 pr-4 pl-12"}
          >
            <h2
              className={"capitalize font-pokemonNameFont text-2xl text-center"}
            >
              {props.pokemonName}
            </h2>
            <p className="py-4 m-auto text-center max-w-xl">
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
                  return baseStat(stat.stat.name, stat.base_stat);
                })}
              </div>
            </div>

            {props.pokeEvolutions?.length !== 0 && evoChain}
            {navigationButtons}
          </div>
        </div>
      </div>
    </div>
  );
}
