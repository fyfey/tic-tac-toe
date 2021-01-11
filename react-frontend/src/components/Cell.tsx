import React, { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { hex } from '../utils';
const { indexToGridSize } = require('tic-tac-toe');


enum CellState {
    EMPTY   = 0x00,
    PLAYER1 = 0x01,
    PLAYER2 = 0x03
}
type Props = {
    idx: number;
    value: CellState;
    size: number;
    onClick: () => void;
}

export const Cell: React.FC<Props> = ({ idx, size, value, onClick }) => {
    const { x, y } = indexToGridSize(idx, size);
    const gridArea = `${y+1} / ${x+1} / ${y+2} / ${x+2}`;
    const borderRadius = 5;
    const style = {
        gridArea,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'grey',
        cursor: 'pointer',
        // borderTopLeftRadius: (x+y === 0) ? borderRadius : 0,
        borderBottomRightRadius: (x === (size -1) && y === (size - 1)) ? borderRadius : 0,
        // borderTopRightRadius: (x === (size - 1) && !y) ? borderRadius : 0,
        borderBottomLeftRadius: (!x && y === (size - 1)) ? borderRadius : 0,
        fontFamily: '"Roboto Mono", monospace',
        boxShadow: (y === 0) ? 'inset 0 10px 10px -10px black' : 'none',
        zIndex: 0,
    } as CSSProperties;
    return (
        <motion.div
            className="cell"
            style={style}
            onClick={onClick}
            transition={{ duration: 0 }}
            whileHover={{ backgroundColor: '#212125' }}
        >{ hex(value, 2) }</motion.div>
    );
}