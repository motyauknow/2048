import './App.css';
import React from 'react';
import useGameLogic from './hooks/useGameLogic';
import Board from './components/Board/Board';

function App() {
  const { board, score, gameOver, moves, restart } = useGameLogic();

  return (
    <>
      {gameOver !== true ? (
        <div className=''>
          <h1>2048!</h1>
          <h2>Счёт: {score} </h2>
          <Board board={board}/>
        </div> ) : 
      (<div className=''> 
        <h1>Game Over!</h1>
        <h2>Счёт: {score} / Ходов: {moves}</h2>
        <button className='restart' onClick={ restart }>Начать заново</button>
      </div>) }
    </>
  );
};

export default App
