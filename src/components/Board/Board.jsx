import React from "react";
import Tile from '../Tile/Tile'
import styles from '../Board/Board.module.css'

function Board({ board }) {
    return (
        <div className={styles.board}>
            {board.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
                {row.map((cell, colIndex) => (
                <Tile key={`${rowIndex}-${colIndex}`} value={cell} />
                ))}
            </div>
            ))}
        </div>
    );
};

export default Board;