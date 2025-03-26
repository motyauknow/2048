import { useState } from "react";

function useGameLogic() {
    const [board, setBoard] = useState([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [2, 2, 0, 0],
        [0, 0, 0, 0],
    ]);
    const [score, setScore] = useState(0);

    const moveTiles = (direction) => {

    }

    return { board, score };
};

export default useGameLogic;