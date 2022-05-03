import React from 'react'
import { GameOverContainer } from './style'

export const GameOver = ({handleGameReset}) => {
  return (
    <GameOverContainer> 
        <p> Game Over</p>
        <button onClick={handleGameReset}>Restart Game</button>
    </GameOverContainer>
  )
}
