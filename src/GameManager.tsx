import "./App.css";
import { useRecoilState, useRecoilValue } from "recoil";
import Game from "./Game";
import { defaultGameData } from "./GameData";
import {
  foundLinesState,
  hintProgressState,
  hintState,
} from "./atoms/gameState";

const gameData = defaultGameData;

function App() {
  const hintProgress = useRecoilValue(hintProgressState);

  const found = useRecoilValue(foundLinesState);

  const [hints, setHintState] = useRecoilState(hintState);

  const activateHint = () => {
    const hintVals = gameData.positions[0];
    console.log(hintVals);
    setHintState(hints.concat(hintVals));
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
          <b>{found.length}</b> of <b>7</b> theme words found.
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
