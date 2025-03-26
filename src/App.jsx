import './App.css';
import React from 'react';
import useGameLogic from './hooks/useGameLogic';
import Board from './components/Board/Board';

function App() {
  const { board, score } = useGameLogic();

  return (
    <>
      <h1>2048!</h1>
      <div>Счёт: {score}</div>
      <Board board={board}/>
    </>
  )
}

export default App
