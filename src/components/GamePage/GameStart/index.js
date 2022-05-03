import React from 'react'
import { GameStartContainer } from './style'

export const GameStart = ({handleGameStart}) => {
  return (
    <GameStartContainer> 
        <button onClick={handleGameStart}>START GAME</button>
    </GameStartContainer>
  )
}
