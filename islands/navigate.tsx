import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
interface Props {
  index: number | string;
}

export default function Navigate(props: Props) {
  const [newIndex, setNewIndex] = useState<number>(Number(props.index));

  const handleClick = (value: number) => {
    const tmp = Number(props.index) + value;
    setNewIndex(tmp);
    window.location.href = `/pokemons/${tmp}`;
  };

  return (
    <div>
      {newIndex !== 1 && (
        <Button onClick={() => handleClick(-1)}>
          zurück
        </Button>
      )}

      {newIndex !== 1100 &&
        (
          <Button onClick={() => handleClick(1)}>
            weiter
          </Button>
        )}
    </div>
  );
}
