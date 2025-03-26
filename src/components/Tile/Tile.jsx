import React from "react";
import styles from '../Tile/Tile.module.css';

function Tile({ value }) {
    const tileClass = `${styles.tile} ${value ? styles[`tile-${value}`] : styles.empty}`

    return (
        <div className={ tileClass }>
            { value !== 0 && value }
        </div>
    );
};

export default Tile;