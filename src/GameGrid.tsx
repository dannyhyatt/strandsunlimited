import { MouseEventHandler, useEffect, useState } from "react";


export const circlePositions = [
  { id: "1-1", pos: [25, 25] },
  { id: "1-2", pos: [75, 25] },
  { id: "1-3", pos: [125, 25] },
  { id: "1-4", pos: [175, 25] },
  { id: "1-5", pos: [225, 25] },
  { id: "1-6", pos: [275, 25] },
  { id: "2-1", pos: [25, 75] },
  { id: "2-2", pos: [75, 75] },
  { id: "2-3", pos: [125, 75] },
  { id: "2-4", pos: [175, 75] },
  { id: "2-5", pos: [225, 75] },
  { id: "2-6", pos: [275, 75] },
  { id: "3-1", pos: [25, 125] },
  { id: "3-2", pos: [75, 125] },
  { id: "3-3", pos: [125, 125] },
  { id: "3-4", pos: [175, 125] },
  { id: "3-5", pos: [225, 125] },
  { id: "3-6", pos: [275, 125] },
  { id: "4-1", pos: [25, 175] },
  { id: "4-2", pos: [75, 175] },
  { id: "4-3", pos: [125, 175] },
  { id: "4-4", pos: [175, 175] },
  { id: "4-5", pos: [225, 175] },
  { id: "4-6", pos: [275, 175] },
  { id: "5-1", pos: [25, 225] },
  { id: "5-2", pos: [75, 225] },
  { id: "5-3", pos: [125, 225] },
  { id: "5-4", pos: [175, 225] },
  { id: "5-5", pos: [225, 225] },
  { id: "5-6", pos: [275, 225] },
  { id: "6-1", pos: [25, 275] },
  { id: "6-2", pos: [75, 275] },
  { id: "6-3", pos: [125, 275] },
  { id: "6-4", pos: [175, 275] },
  { id: "6-5", pos: [225, 275] },
  { id: "6-6", pos: [275, 275] },
  { id: "7-1", pos: [25, 325] },
  { id: "7-2", pos: [75, 325] },
  { id: "7-3", pos: [125, 325] },
  { id: "7-4", pos: [175, 325] },
  { id: "7-5", pos: [225, 325] },
  { id: "7-6", pos: [275, 325] },
  { id: "8-1", pos: [25, 375] },
  { id: "8-2", pos: [75, 375] },
  { id: "8-3", pos: [125, 375] },
  { id: "8-4", pos: [175, 375] },
  { id: "8-5", pos: [225, 375] },
  { id: "8-6", pos: [275, 375] },
];

export default function SVGGrid({
  addNewLine,
  removeLineByIndex,
  deselectOnNewLine = true,
  padding = defaultSizingOptions.padding,
  lines = []
}: {
  addNewLine: (line: { from: string; to: string }) => void;
  removeLineByIndex: (idx: number) => void;
  deselectOnNewLine?: boolean;
  padding?: number;
  lines?: { from: string; to: string }[];

}) {
  const [svgSize, setSVGSize] = useState(() => getSVGSize(padding));
  const [newLineSource, setNewLineSource] = useState<string | null>(null);

  useEffect(() => {
    const resizeListener = () => setSVGSize(getSVGSize(padding));
    window.addEventListener("resize", resizeListener);
    return window.removeEventListener("resize", () => resizeListener);
  }, [padding]);

  const circleRadius = 5;

  const getCirclePositionById = (id: string) =>
    circlePositions.find((cPos) => cPos.id === id)?.pos;

  const handleBackgroundClick: MouseEventHandler = (_) => {
    setNewLineSource(null);
  };

  // dunno what type e should be here
  const handleCircleClick = (e: any, circleId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (newLineSource && circleId !== newLineSource) {
      addNewLine({ from: newLineSource, to: circleId });
      if (deselectOnNewLine) {
        setNewLineSource(null);
      }
    } else if (!newLineSource) {
      setNewLineSource(circleId);
    } else {
      setNewLineSource(null);
    }
  };

  return (
    <svg
      viewBox="0 0 300 400"
      width={''}
      height={''}
      onClick={handleBackgroundClick}
    >
      {/* draw fixed circles */}

      {/* draw user provided lines */}
      {lines.map((line, idx) => {
        const sourcePos = getCirclePositionById(line.from);
        const targetPos = getCirclePositionById(line.to);
        if (!sourcePos || !targetPos) {
          console.error("Invalid source line, probably:", {
            line,
            sourcePos,
            targetPos
          });
          return null;
        }

        return (
          <line
            key={`SVGGrid-line-${idx}`}
            className="SVGGrid-line"
            onClick={(_) => removeLineByIndex(idx)}
            strokeWidth={4}
            x1={sourcePos[0]}
            y1={sourcePos[1]}
            x2={targetPos[0]}
            y2={targetPos[1]}
          />
        );
      })}
    </svg>
  );
}


const defaultSizingOptions = {
  padding: 30,
  maxSize: 400
};
const getSVGSize = (padding: any) => Math.min(400, window.innerWidth - 2 * padding);
