import React, { CSSProperties, useEffect, useState } from "react";
import { Cell } from "./Cell";
import { indexToGridSize, getCell, setCell } from "tic-tac-toe";

type Props = {
  size: number;
  player: 1 | 3;
  value: number;
  onChange: (val: number) => void;
};

export const Board: React.FC<Props> = ({ size, value, player, onChange }) => {
  const [board, setBoard] = useState(0x00);
  const cells = new Array(size ** 2).fill(0);
  const style: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(1fr, ${size})`,
    gridTemplateRows: `repeat(1fr, ${size})`,
    gap: "1px 1px",
    width: 260,
    height: 260,
    margin: 0,
    borderRadius: 5,
    zIndex: 1,
  };
  const clickCell = (idx: number) => {
    const { x, y } = indexToGridSize(idx, size);
    const newVal = setCell(board, x, y, player);
    setBoard(newVal);
    onChange(newVal);
  };
  useEffect(() => {
    setBoard(value);
  }, [value]);

  return (
    <div className="board" style={style}>
      {cells.map((value, idx) => {
        const { x, y } = indexToGridSize(idx, size);
        return (
          <Cell
            onClick={() => clickCell(idx)}
            value={getCell(board, x, y)}
            idx={idx}
            key={idx}
            size={size}
          />
        );
      })}
    </div>
  );
};
