import { useState } from "react";
import { GameData } from "./GameData";
import SVGGrid, { circlePositions } from "./GameGrid";


export default function Game({ data } : { data: GameData }) {

  const [lines, setLines] = useState([
    { from: "1-1", to: "1-2" },
    { from: "2-1", to: "2-2" },
  ]);

  // array of all the node ids
  const [currentLine, setCurrentLine] = useState<string[]>([]);

  const getStringFromIds = (ids: string[]) => {
    return ids.map((id) => getLetterFromId(id)).join('');
  }

  const getLetterFromId = (id: string) => {
    for(let i = 0; i < data.positions.length; i++) {
      const j = data.positions[i].indexOf(id);
      if(j !== -1) {
        return data.words[i][j];
      }
    }
    return '-'; // so we know if something went wrong
  }

  const toFromToArray = (ids: string[]) => {
    const arr = [];
    for(let i = 0; i < ids.length - 1; i++) {
      arr.push({ from: ids[i], to: ids[i + 1] });
    }
    return arr;
  }

  const isNeighbor = (id1: string, id2: string) => {

    const x1 = parseInt(id1[0]), y1 = parseInt(id1[2]);
    const x2 = parseInt(id2[0]), y2 = parseInt(id2[2]);

    if(x1 === x2 && Math.abs(y1 - y2) === 1) return true;
    if(y1 === y2 && Math.abs(x1 - x2) === 1) return true;
    if(Math.abs(x1 - x2) === 1 && Math.abs(y1 - y2) === 1) return true;

    return false;

  }

  const nodeInteractionHandler = (id: string) => {
    // check to see if it's a valid move
    if(
      currentLine.length > 0 && 
      isNeighbor(currentLine[currentLine.length - 1], id) && 
      !currentLine.includes(id)
    ) {
      setCurrentLine([...currentLine, id]);
    } else if(
      currentLine.length > 1 &&
      currentLine.includes(id)
    ) {
      setCurrentLine(currentLine.slice(0, currentLine.indexOf(id) + 1));
    } else {
      setCurrentLine([id]);
    }
  }

  return (
    <>
    <span className="text-xl">
      {/* add a space before and after so the height stays constant */}
      {'\u00A0'}{getStringFromIds(currentLine)}{'\u00A0'}
    </span>
    <div className="relative">

      <SVGGrid
        lines={toFromToArray(currentLine)}
        addNewLine={(newLine) => setLines((lines) => [...lines, newLine])}
        removeLineByIndex={(lineIdx) =>
          setLines([...lines.slice(0, lineIdx), ...lines.slice(lineIdx + 1)])
        }
      />
      
      <div 
        className="absolute top-0 left-0 w-full h-full grid grid-cols-6 grid-rows-8"
        onMouseUp={(e) => {
          if(currentLine.length > 1) {
            setCurrentLine([]);
          }
        
        }}
      >
        {/* this is basically the ugliest nested for loop ever */}
        {data.positions.map((ids, i) => {

          // id refers to the position id here
          return ids.map((id, j) => {

            const letter = data.words[i][j];

            return (
              <span
                key={`grid-${id}`}
                style={{ gridRow: id[0], gridColumn: id[2] }}
                className="cursor-pointer flex"
              >
                <span
                  className={`${currentLine.includes(id) ? 'bg-slate-400' : ''} rounded-full h-8 w-8 pt-1 m-auto block cursor-pointer select-none`}
                  onClick={(e) => {
                    console.log('clicked on', id);
                    nodeInteractionHandler(id);
                  }}
                  onMouseDown={(e) => {
                    if(e.buttons === 1) {
                      console.log('dragged start', id);
                      nodeInteractionHandler(id);
                    }
                  }}
                  onMouseEnter={(e) => {
                    if(e.buttons === 1) {
                      console.log('dragged over', id);
                      nodeInteractionHandler(id);
                    }
                  }}
                >
                  {letter}
                </span>
              </span>
          );
          });
          
      }).flat()}
      </div>

    </div>
    </>
  );

}