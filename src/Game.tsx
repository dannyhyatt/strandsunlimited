import { useState } from "react";
import { GameData } from "./GameData";
import SVGGrid, { circlePositions, toFromToArray } from "./GameGrid";


export default function Game({ data } : { data: GameData }) {

  const [lines, setLines] = useState([
    { from: "1-1", to: "1-2" },
    { from: "2-1", to: "2-2" },
  ]);

  const [timeoutRef, setTimeoutRef] = useState<number | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  const [foundLines, setFoundLines] = useState<string[][]>([]);

  // array of all the node ids
  const [currentLine, setCurrentLine] = useState<string[]>([]);

  const [displayText, setDisplayText] = useState<string>('');

  console.log('currentLine', currentLine);

  const submitLine = () => {
    if(data.positions.some((ids) => ids.every((id,i) => currentLine.length > i && currentLine[i] === id))) {
      setFoundLines([...foundLines, currentLine]);
      setDisplayText('');
    } else {
      setTimeout(() => {
        setDisplayText('');
      }, 1000);
    }
    setCurrentLine([]);
  }

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
    if (currentLine.length == 1 && currentLine[0] == id) {
      setCurrentLine([])
      setDisplayText('');
    } else if(
      currentLine.length > 0 && 
      isNeighbor(currentLine[currentLine.length - 1], id) && 
      !currentLine.includes(id)
    ) {
      setCurrentLine([...currentLine, id]);
      setDisplayText(getStringFromIds([...currentLine, id]));
    } else if(
      currentLine.length > 1 &&
      currentLine.includes(id)
    ) {
      setCurrentLine(currentLine.slice(0, currentLine.indexOf(id) + 1));
      setDisplayText(getStringFromIds(currentLine.slice(0, currentLine.indexOf(id) + 1)));
    } else {
      setCurrentLine([id]);
      setDisplayText(getLetterFromId(id));
    }

  }

  return (
    <>
    <span className={`text-xl font-bold ${displayText.length != currentLine.length && 'wrong-answer'}`}>
      {/* add a space before and after so the height stays constant */}
      {'\u00A0'}{displayText}{'\u00A0'}
    </span>
    <div className="relative">

      <SVGGrid
        lines={[
          {
            ids: currentLine,
            color: 'rgb(148 163 184)' // taken from the css file
          },
          ...foundLines.map((line) => {
            return {
              ids: line,
              color: data.positions[0].every((id,i) => line.length > i && line[i] === id) ? 'rgb(219, 223, 97)' : 'rgb(96 165 250)'
            }
          })
        ]}
      />
      
      <div 
        className="absolute top-0 left-0 w-full h-full grid grid-cols-6 grid-rows-8 "
        onMouseUp={(_) => {
          if (timeoutRef) {
            clearTimeout(timeoutRef);
            setTimeoutRef(null);
            // setDragging(false)
          }
          if(currentLine.length > 1 && dragging) {
            submitLine();
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
                className={`cursor-pointer flex ${currentLine.length > 1 && !dragging && currentLine[currentLine.length - 1] == id ? 'border-2 border-[rgb(148,163,184)] rounded-full' : ''}`}
              >
                <span
                  className={`letter-opt${currentLine.includes(id) ? ' selected' : foundLines.flat().includes(id) ? data.positions[0].includes(id) ? ' spanagram found' : ' found' : ''} rounded-full h-8 w-8 pt-1 m-auto block cursor-pointer select-none`}
                  onMouseDown={(e) => {
                    if(e.buttons === 1) {
                      console.log('dragged start', id);
                      if (!dragging && currentLine.length > 1 && currentLine[currentLine.length - 1] == id) {
                        submitLine();
                      } else {
                        setDragging(false);
                        if (timeoutRef != null) {
                          clearTimeout(timeoutRef);
                          setTimeoutRef(null);
                        }
                        const newTimeoutRef = setTimeout(() => {
                          setTimeoutRef(null);
                          setDragging(true);
                        }, 200);
                        setTimeoutRef(newTimeoutRef);
                        nodeInteractionHandler(id);
                      }
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

    <div className={`fixed top-0 right-0 left-0 bottom-0 ${foundLines.length != data.words.length && 'hidden'} bg-black bg-opacity-25`}>
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col justify-center items-center bg-white p-4 rounded-lg">
          <h1 className="text-3xl">You Win!</h1>
          <p>You found all the words!</p>
          think about what you've done
        </div>
      </div>
    </div>

    </>
  );

}