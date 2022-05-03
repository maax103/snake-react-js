import React from 'react'
import { GameScoreContainer } from './style'

export const GameScore = ({ score }) => {
  
    return (
    <GameScoreContainer> 
        Score: {score}
    </GameScoreContainer>
  )
}