import styled from "styled-components";

export const GameOverContainer = styled.div`
    width: 150px;
    background-color: #121214;
    height: 150px;
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
        font-size: 0.9rem;
        line-height: 100%;
        color: #919191;
        transition: color, 0.3s, border-bottom, 0.3s;
        padding: 0.6rem;
        border-bottom: 2px solid #00000000;
        /* padding-bottom: 0.5rem; */
        &:hover{
            color: #FFFFFF;
            font-size: 0.95rem;
            /* font-weight: bold; */
            border-bottom: 2px solid #8257E6;
        }
    }
`