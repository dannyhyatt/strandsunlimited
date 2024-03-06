import { useState } from "react";
import { GameData } from "./GameData";
import SVGGrid from "./GameGrid";


export default function Game({ data } : { data: GameData }) {


  const [lines, setLines] = useState([
    { from: "1-1", to: "1-2" },
    { from: "2-1", to: "2-2" }
  ]);

  return (
    <SVGGrid
        lines={lines}
        addNewLine={(newLine) => setLines((lines) => [...lines, newLine])}
        removeLineByIndex={(lineIdx) =>
          setLines([...lines.slice(0, lineIdx), ...lines.slice(lineIdx + 1)])
        }
      />
  );

}