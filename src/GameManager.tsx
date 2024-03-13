import "./App.css";
import { useRecoilState, useRecoilValue } from "recoil";
import Game from "./Game";
import { defaultGameData } from "./GameData";
import {
  foundLinesState,
  foundWords,
  hintProgressState,
  hintState,
} from "./atoms/gameState";
import { useState } from "react";

const gameData = defaultGameData;

function App() {
  const [hintProgress, setHintProgress] = useRecoilState(hintProgressState);

  const found = useRecoilValue(foundLinesState);
  const words = useRecoilValue(foundWords);

  const [usedHints, setUsedHints] = useState<string[]>([]);

  const [hints, setHintState] = useRecoilState(hintState);

  const activateHint = () => {
    if (hintProgress >= 3) {
      const ind = gameData.words.findIndex(
        (x) => !words.includes(x) && !usedHints.includes(x)
      );
      if (ind != -1) {
        const hintVals = gameData.positions[ind];
        const hintWord = gameData.words[ind];
        setUsedHints(usedHints.concat([hintWord]));
        setHintState(hints.concat(hintVals));
        setHintProgress(hintProgress - 3);
      }
    }
  };

  return (
    <div className="flex justify-center flex-wrap gap-8">
      <div className="flex flex-col justify-center gap-4">
        <h1 className="text-3xl">Strands Unlimited</h1>
        <span className="flex flex-col border-2 rounded-lg">
          <p className="bg-yellow-100 rounded-t-lg pt-1 pb-1">Theme:</p>
          <h2 className="text-xl my-2">{defaultGameData.theme}</h2>
        </span>
        <div>
          <b>{found.length}</b> of <b>{gameData.words.length}</b> theme words
          found.
        </div>
        <div className="hint-cont" onClick={activateHint}>
          <button className="hint-btn">Hint</button>
          <div
            className="hint-btn-overlay"
            style={{ width: `${(hintProgress / 3) * 150}px` }}
          >
            <button className="hint-btn-o-inner">Hint</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4">
        <Game data={gameData} />
      </div>
    </div>
  );
}

export default App;
