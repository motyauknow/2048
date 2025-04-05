import './App.css';
import React from 'react';
import useGameLogic from './hooks/useGameLogic';
import Board from './components/Board/Board';

function App() {
  const { board, score, gameOver, restart } = useGameLogic();

  return (
    <>
      {gameOver !== true ? (
        <div>
          <h1>2048!</h1>
          <div>Счёт: {score} </div>
          <Board board={board}/>
        </div> ) : 
      (<div> 
        <h1>Game Over!</h1>
        <h2>Счёт: {score} </h2>
        <button onClick={ restart }>Начать заново</button>
      </div>) }
    </>
  );
};

export default App
