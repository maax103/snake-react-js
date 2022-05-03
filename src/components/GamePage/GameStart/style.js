import styled from "styled-components";

export const GameStartContainer = styled.div`
    width: 300px;
    background-color: #121214;
    height: 300px;
    /* border: 1px solid #8257E6; */
    border-right: none;
    border-left: none;
    position: absolute;
    display: flex;
    justify-content: center;
    top: 50%;
    right: 50%;
    transform: translate(50%,-50%);
    align-items: center;
    flex-direction: column;

    p{
        color: #ff4444;
    }

    button{
        background-color: #FFFFFF00;
        border: none;
        font-size: 2rem;
        line-height: 100%;
        color: #919191;
        transition: color, 0.3s, border-bottom, 0.3s;
        padding: 0.6rem;
        border-bottom: 2px solid #00000000;
        &:hover{
            color: #FFFFFF;
            font-size: 2.2rem;
            /* font-weight: bold; */
            border-bottom: 2px solid #8257E6;
        }
    }
`