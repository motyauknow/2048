import './App.css';
import React from 'react';
import useGameLogic from './hooks/useGameLogic';
import Board from './components/Board/Board';

function App() {
  const { board, score, gameOver } = useGameLogic();

  return (
    <>
      <h1>2048!</h1>
      <div>Счёт: {score} </div>
      <Board board={board}/>
      {gameOver && <div className=''>Game over</div>}
    </>
  )
}

export default App
