import { MouseEventHandler, useEffect, useState } from "react";

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
  const circlePositions = [
    { id: "1-1", pos: [10, 10] },
    { id: "1-2", pos: [50, 10] },
    { id: "1-3", pos: [100, 10] },
    { id: "1-4", pos: [150, 10] },
    { id: "1-5", pos: [200, 10] },
    { id: "1-6", pos: [250, 10] },
    { id: "2-1", pos: [10, 50] },
    { id: "2-2", pos: [50, 50] },
    { id: "2-3", pos: [100, 50] },
    { id: "2-4", pos: [150, 50] },
    { id: "2-5", pos: [200, 50] },
    { id: "2-6", pos: [250, 50] },
    { id: "3-1", pos: [10, 100] },
    { id: "3-2", pos: [50, 100] },
    { id: "3-3", pos: [100, 100] },
    { id: "3-4", pos: [150, 100] },
    { id: "3-5", pos: [200, 100] },
    { id: "3-6", pos: [250, 100] },
    { id: "4-1", pos: [10, 150] },
    { id: "4-2", pos: [50, 150] },
    { id: "4-3", pos: [100, 150] },
    { id: "4-4", pos: [150, 150] },
    { id: "4-5", pos: [200, 150] },
    { id: "4-6", pos: [250, 150] },
    { id: "5-1", pos: [10, 200] },
    { id: "5-2", pos: [50, 200] },
    { id: "5-3", pos: [100, 200] },
    { id: "5-4", pos: [150, 200] },
    { id: "5-5", pos: [200, 200] },
    { id: "5-6", pos: [250, 200] },
    { id: "6-1", pos: [10, 250] },
    { id: "6-2", pos: [50, 250] },
    { id: "6-3", pos: [100, 250] },
    { id: "6-4", pos: [150, 250] },
    { id: "6-5", pos: [200, 250] },
    { id: "6-6", pos: [250, 250] },
    { id: "7-1", pos: [10, 300] },
    { id: "7-2", pos: [50, 300] },
    { id: "7-3", pos: [100, 300] },
    { id: "7-4", pos: [150, 300] },
    { id: "7-5", pos: [200, 300] },
    { id: "7-6", pos: [250, 300] },
    { id: "8-1", pos: [10, 350] },
    { id: "8-2", pos: [50, 350] },
    { id: "8-3", pos: [100, 350] },
    { id: "8-4", pos: [150, 350] },
    { id: "8-5", pos: [200, 350] },
    { id: "8-6", pos: [250, 350] },
  ];

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
      width={svgSize}
      height={svgSize}
      onClick={handleBackgroundClick}
    >
      {/* draw fixed circles */}
      {circlePositions.map(({ id, pos }) => (
        <circle
          key={id}
          id={`SVGGrid-circle-${id}`}
          className={[
            "SVGGrid-circle",
            id === newLineSource && "SVGGrid-circle-active"
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={(e) => handleCircleClick(e, id)}
          cx={pos[0]}
          cy={pos[1]}
          r={circleRadius}
        />
      ))}
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
