import React, { useState } from 'react'
import { Game } from './Game'
import { GameScore } from './GameScore';
import { GameStart } from './GameStart';
import { PageContainer } from './style';
import { useAudio } from '../../assets/useAudio';

export const GamePage = () => {

  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const [, playClickGameAudio] = useAudio("https://raw.githubusercontent.com/maax103/snake-react-js/gh-pages/clickGameAudio.wav")

  function handleGameStart(){
    setGameStart(true);
    playClickGameAudio();
  }

  function handleGameReset(){
    playClickGameAudio();
    setGameOver(false);
    setGameStart(false);
    setScore(0);
  }

  return (
      <PageContainer>
        {!gameStart?
        <>
          <GameStart handleGameStart={handleGameStart} />
        </> :
          <>
            <GameScore score={score}/>
            <Game gameStart={gameStart} score={score} setScore={setScore} setGameOver={setGameOver}
            gameOver={gameOver} handleGameReset={handleGameReset}/>
          </>}
      </PageContainer>
  )
}
