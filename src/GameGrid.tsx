
interface CirclePosition {
  id: string;
  pos: [number, number];
}

interface Line {
  ids: string[];
  color: string;
}

export const circlePositions: CirclePosition[] = [
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

export const toFromToArray = (ids: string[], color: string) => {
  const arr = [];
  for(let i = 0; i < ids.length - 1; i++) {
    arr.push({ from: ids[i], to: ids[i + 1], color });
  }
  return arr;
}

export default function SVGGrid({
  lines = []
}: {
  deselectOnNewLine?: boolean;
  padding?: number;
  lines?: Line[];

}) {

  const toIndividualLines = (lines: Line[]) => lines.map((line) => {
    return toFromToArray(line.ids, line.color);
  });

  const getCirclePositionById = (id: string) =>
    circlePositions.find((cPos) => cPos.id === id)?.pos;

  return (
    <svg
      viewBox="0 0 300 400"
      width={'100%'}
      height={'100%'}
    >
      {/* draw fixed circles */}

      {/* draw user provided lines */}
      {toIndividualLines(lines).flat().map((line, idx) => {
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
            stroke={line.color}
            fill={line.color}
            // className="SVGGrid-line"
            strokeWidth={8}
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