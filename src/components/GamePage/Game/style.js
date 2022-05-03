import styled from "styled-components";

export const GameContainer = styled.div`
    width: 400px;
    height: 400px;
    border: 1px solid #8257E6;
    padding: 2px;
    position: relative;
    *{
        box-sizing: border-box;
    }
    .cell{
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 100%;
    }
    .row{
        display: flex;
        flex-direction: row;

        &:last-child{
            border: none;
        }
    }
    .player{
        background-color: #e1e1e6;
    }
    .head{
        background-color: #4f86ff;
    }
    .fruit{
        background-color: #7fff9f;
    }
`