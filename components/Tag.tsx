interface Props {
  name: string;
}

interface ColorMap {
  [key: string]: string;
}

const colorMap: ColorMap = {
  "fire": "bg-fire",
  "water": "bg-water",
  "grass": "bg-grass",
  "poison": "bg-poison",
  "bug": "bg-bug",
  "normal": "bg-normal",
  "flying": "bg-flying",
  "electric": "bg-electric",
  "ground": "bg-ground",
  "fairy": "bg-fairy",
  "fighting": "bg-fighting",
  "psychic": "bg-psychic",
  "rock": "bg-rock",
  "steel": "bg-steel",
  "ice": "bg-ice",
  "ghost": "bg-ghost",
  "dragon": "bg-dragon",
  "dark": "bg-dark",
};

const Tag = (props: Props) => {
  return (
    <div
      className={`text-lg px-2 w-[72px] flex justify-center rounded text-white ${
        colorMap[props.name]
      }`}
    >
      {props.name}
    </div>
  );
};

export default Tag;
