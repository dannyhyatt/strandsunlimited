import { useState } from "react";
import "./App.css";
import Game from "./Game";
import { defaultGameData } from "./GameData";

const gameData = defaultGameData;

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center flex-wrap gap-x-8">
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-3xl">Strands Unlimited</h1>
          <span className="flex flex-col border-2 rounded-lg">
            <p className="bg-yellow-100 rounded-t-lg pt-1 pb-1">Theme:</p>
            <h2 className="text-xl my-2">{defaultGameData.theme}</h2>
          </span>
          <div>
            <b>0</b> of <b>7</b> theme words found.
          </div>
          <button className="hint-btn">Hint</button>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <Game data={gameData} />
        </div>
      </div>
    </>
  );
}

export default App;
