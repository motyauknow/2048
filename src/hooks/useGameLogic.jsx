import { useState, useCallback, useEffect } from 'react';

const createInitialBoard = () => [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

export default function useGameLogic() {
    const addRandomTile = useCallback((board) => {
        const newBoard = board.map(row => [...row]);
        const emptyCells = [];
        
        for (let row = 0; row < 4; row++) {
          for (let col = 0; col < 4; col++) {
            if (newBoard[row][col] === 0) {
              emptyCells.push({ row, col });
            }
          }
        }
        
        if (emptyCells.length > 0) {
          const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
          newBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
        }
        
        return newBoard;
    }, []);
  const [board, setBoard] = useState(() => {
    const board = createInitialBoard();
    return addRandomTile(addRandomTile(board));
  });
  
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Добавление случайной плитки (2 или 4)


  // Проверка окончания игры
  const checkGameOver = useCallback((board) => {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] === 0) return false;
        if (col < 3 && board[row][col] === board[row][col + 1]) return false;
        if (row < 3 && board[row][col] === board[row + 1][col]) return false;
      }
    }
    console.log('gameover')
    return true;
  }, []);

  // Основная функция движения
  const moveTiles = useCallback((direction) => {
    setBoard(prevBoard => {
      const newBoard = prevBoard.map(row => [...row]);
      let moved = false;
      let scoreIncrease = 0;

      const processLine = (line) => {
        const filtered = line.filter(val => val !== 0);
        const merged = [];
        
        for (let i = 0; i < filtered.length; i++) {
            moved = true;
          if (filtered[i] == filtered[i + 1]) {
            merged.push(filtered[i] * 2);
            scoreIncrease += filtered[i] * 2;
            i++;
            moved = true;
            console.log(moved)
          } else {
            merged.push(filtered[i]);
          }
        }
        
        while (merged.length < 4) merged.push(0);
        return merged;
      };

      switch (direction) {
        case 'left':
          for (let row = 0; row < 4; row++) {
            newBoard[row] = processLine(newBoard[row]);
          }
          break;
          
        case 'right':
          for (let row = 0; row < 4; row++) {
            newBoard[row] = processLine([...newBoard[row]].reverse()).reverse();
          }
          break;
          
        case 'up':
          for (let col = 0; col < 4; col++) {
            const column = [0,1,2,3].map(row => newBoard[row][col]);
            const processed = processLine(column);
            for (let row = 0; row < 4; row++) {
              newBoard[row][col] = processed[row];
            }
          }
          break;
          
        case 'down':
          for (let col = 0; col < 4; col++) {
            const column = [3,2,1,0].map(row => newBoard[row][col]);
            const processed = processLine(column);
            for (let row = 0; row < 4; row++) {
              newBoard[3-row][col] = processed[row];
            }
          }
          break;
      }

      if (moved) {
        setScore(prev => prev + scoreIncrease);
        const updatedBoard = addRandomTile(newBoard);
        if (checkGameOver(updatedBoard)) setGameOver(true);
        console.log('moved')
        return updatedBoard;
      }
      
      console.log('not')
      return prevBoard;
    });
  }, [addRandomTile, checkGameOver]);

  // Обработка клавиатуры
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        moveTiles(e.key.replace('Arrow', '').toLowerCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveTiles]);

  return { board, score, gameOver, moveTiles };
}