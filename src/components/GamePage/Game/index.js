import React, { useEffect, useState } from 'react'
import { GameContainer } from './style'
import { GameOver } from '../GameOver';
import { useAudio } from '../../../assets/useAudio';

export const Game = ({score, gameStart, setGameOver, setScore, handleGameReset, gameOver}) => {

    const [, playPickFruitAudio] = useAudio("https://raw.githubusercontent.com/maax103/snake-react-js/gh-pages/pickFruitAudio.wav");
    const [, playGameOverAudio] = useAudio("https://raw.githubusercontent.com/maax103/snake-react-js/gh-pages/gameOverAudio.wav");

    const GAME_ROWS = 20;
    const GAME_COLUMNS = 20;
    const PLAYER_HEAD = 3;
    const VOID_SPACE = 0;
    const FRUIT = 2;
    const PLAYER_BODY = 1;
    var COLIDE = false;
    var level = 1;
    const GAME_LEVEL = {
        1: 100,
        2: 90,
        3: 80,
        4: 70,
        5: 60,
        6: 50,
    };
    var timeStep = {};
    var nextMove = "ARROWRIGHT";
    var lastMove = "ARROWRIGHT";

    const [fieldStatus, setFieldStatus] = useState(
        Array(GAME_ROWS).fill(0).map((_, row) => {
            return (
                Array(GAME_COLUMNS).fill(0).map((_, column) => {
                    return (
                        0
                    )
                }))
        })
    );

    var body_position = [{ row: 3, column: 2 }];

    useEffect(() => {

        resetGame();

        const GAME_VALID_MOVES = [
            'ARROWUP', 'ARROWDOWN', 'ARROWLEFT', 'ARROWRIGHT'
        ];

        const listeningKeys = (event) => {
            let key = event.key.toUpperCase();
            if (GAME_VALID_MOVES.includes(key) && isValidKey(key, lastMove)) {
                nextMove = key;
            }
        }

        window.removeEventListener("keydown", listeningKeys)
        window.addEventListener("keydown", listeningKeys);

        timeStep = setInterval(() => {
            handleMove(nextMove, timeStep);
            lastMove = nextMove;
        }, GAME_LEVEL[level]);

        return (() => {
            console.log("componente removido")
            clearInterval(timeStep);
            window.removeEventListener("keydown", listeningKeys)
        })
    }, [level])

    function updateLevel(){
        clearInterval(timeStep);
        level = level + 1;
        timeStep = setInterval(() => {
            handleMove(nextMove, timeStep);
            lastMove = nextMove;
        }, GAME_LEVEL[level]);
    }

    function isValidKey(key, lastMove) {
        if (key == "ARROWUP") {
            return lastMove === "ARROWDOWN" ? false : true
        } else if (key == "ARROWDOWN") {
            return lastMove === "ARROWUP" ? false : true
        } else if (key == "ARROWLEFT") {
            return lastMove === "ARROWRIGHT" ? false : true
        } else {
            return lastMove === "ARROWLEFT" ? false : true
        }
    }

    function resetGame() {
        setFieldStatus((fieldStatus) => {
            let newArray = [...fieldStatus];
            body_position.map((elem) => {
                newArray[elem.row][elem.column] = PLAYER_BODY;
            });
            newArray[3][3] = PLAYER_HEAD;
            newArray[15][15] = FRUIT;
            return newArray;
        })
    }

    function propagate(head_position, colision) {
        let newArray = [...fieldStatus];
        body_position.push({ row: head_position.row, column: head_position.column });

        if (!colision) {
            newArray[body_position[0].row][body_position[0].column] = VOID_SPACE;
            body_position.shift();
            COLIDE = false;
        } else {
            COLIDE = true;
        }

        if (body_position.length) {
            setFieldStatus((fieldStatus) => {
                body_position.map((elem) => {
                    newArray[elem.row][elem.column] = PLAYER_BODY;
                });
                return newArray;
            });
        }
    }

    function checkColision(next_move, moveFunction) {

        let colision = false;

        let lastValue = fieldStatus[next_move.row][next_move.column];
        if (lastValue == FRUIT) {
            colision = true;
        }else if(lastValue == PLAYER_BODY){
            playGameOverAudio();
            clearInterval(moveFunction);
            setGameOver(true);
        }
        return colision
    }

    function spawnFruit(gameStatus) {
        setFieldStatus(() => {

            let newArray = [...gameStatus];
            var possibleRows = [];
            let possibleColumns = {}
            for(let i = 0; i < GAME_COLUMNS; i ++){
                possibleColumns[i] = [];
            }


            newArray.map( (row, row_index) => {
                if (row.includes(VOID_SPACE)) {
                    possibleRows.push(row_index);
                    row.map((column, column_index)=>{
                        if(column == VOID_SPACE){
                        possibleColumns[row_index].push(column_index);
                        }
                    })

                }
            })
            if(possibleRows.length == 0){ return newArray}
            
            let randomRow = possibleRows[ Math.floor(Math.random() * possibleRows.length) ];
            let randomColumn = possibleColumns[randomRow][ Math.floor(Math.random() * possibleColumns[randomRow].length) ]
            newArray[randomRow][randomColumn] = FRUIT;
            return newArray;
        });
    }

    function handleMove(move, moveFunction) {
        setFieldStatus((fieldStatus) => {
            let newArray = [...fieldStatus];
            let player_row = 0;
            let player_column = 0;
            let next_head_position = {};
            newArray.map((row, row_index) => {
                if (row.includes(PLAYER_HEAD)) {
                    player_row = row_index;
                    player_column = row.indexOf(PLAYER_HEAD);
                }
            });
            switch (move) {
                case "ARROWDOWN":
                    if (player_row === GAME_ROWS - 1) {
                        next_head_position = { row: 0, column: player_column }
                    } else {
                        next_head_position = { row: player_row + 1, column: player_column }
                    }
                    break;
                case "ARROWUP":
                    if (player_row === 0) {
                        next_head_position = { row: GAME_ROWS - 1, column: player_column }
                    } else {
                        next_head_position = { row: player_row - 1, column: player_column }
                    }
                    break
                case "ARROWLEFT":
                    if (player_column === 0) {
                        next_head_position = { row: player_row, column: GAME_COLUMNS - 1 }
                    } else {
                        next_head_position = { row: player_row, column: player_column - 1 }
                    }
                    break
                case "ARROWRIGHT":
                    if (player_column === GAME_COLUMNS - 1) {
                        next_head_position = { row: player_row, column: 0 }
                    } else {
                        next_head_position = { row: player_row, column: player_column + 1 }
                    }
                    break
            }
            propagate(
                { row: player_row, column: player_column },
                checkColision(next_head_position, moveFunction)
            );
            newArray[next_head_position.row][next_head_position.column] = PLAYER_HEAD;
            
            if(COLIDE){
                playPickFruitAudio();
                setScore( score=> {
                    if((score +1) %5 == 0 && level < 6){updateLevel()}
                    return score + 1} )
                spawnFruit(newArray)
            }
            return newArray;
        })
    }

    return (
        <>
            <GameContainer>
                {Array(GAME_ROWS).fill(0).map((_, row) => {
                    return (
                        <div className='row' n={row} key={row}>
                            {Array(GAME_COLUMNS).fill(0).map((_, column) => {
                                return <div n={column} className={`cell ${fieldStatus[row][column] === 2 ? "fruit" :
                                    fieldStatus[row][column] === 1 ? "player" : fieldStatus[row][column] === 3 ? "player head" : ""}`}
                                    key={column}>

                                </div>
                            })}
                        </div>
                    )
                })}
                {gameOver ? <GameOver handleGameReset={handleGameReset}/> : ""}
            </GameContainer>
        </>
    )
}
