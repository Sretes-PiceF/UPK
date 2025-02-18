'use client'
import React from "react";
import styled from "styled-components";

const Button = () => {
    return(
        <StyledWrapper>
            <button>
                <span className="box">
                    KLick
                </span>
            </button>
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`

.box{
    width: 140px;
    height: auto;
    float: left;
    transition: .5s linear;
    position: relative;
    display: block;
    overflow: hidden;
    padding: 15px;
    text-align: center;
    margin: 0 5px;
    background: transparent;
    text-transform: uppercase;
    font-weight: 900;
}

.box:before{
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 4px;
    width: 100%;
    border-bottom: 4px solid transparent;
    border-left: 4px solid transparent;
    box-sizing: border-box;
    transform: translateX(100%);
}

.box:after{
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    border-top: 4px solid transparent;
    border-right: 4px solid transparent;
    box-sizing: border-box;
    transform: translateX(-100%);
}

.box:hover{
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.box:hover:before{
    border-color: #262626;
    height: 100%;
    transform: translateX(0);
    transition: .3s transform linear, .3s height linear .3s;
}

.box:hover:after{
    border-color: #262626;
    height: 100%;
    transform: translateX(0);
    transition: .3s transform linear, .3s height linear .5s;
}

button{
    color: black;
    text-decoration: none;
    cursor: pointer;
    outline: none;
    border: none;
    background: transparent;
}`;


//////////////////////////////////////////

const Buttons = () => {
    return (
        <StylesWrapper>
            <button className="btn">
                Aku di klick
            </button>
        </StylesWrapper>
    )
}

const StylesWrapper = styled.div`
.btn{
    font-size: 17px;
    background: transparent;
    border: none;
    padding: 1em 1.5em;
    color: white;
    text-transform: uppercase;
    position: relative;
    transition: 0.5s ease;
    cursor: pointer;
}

.btn::before{
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 0;
    background-color: #ffc506;
    transition: 0.5s ease;
}

.btn:hover{
    color: #1e1e2b;
    transition-delay: 0.5s;
}

.btn:hover::before{
    width: 100%;
}

.btn::after{
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 0;
    width: 100%;
    background-color: #ffc506;
    transition: 0.4s ease;
    z-index: -1;
}

.btn:hover::after{
    height: 100%;
    transition-delay: 0.4s;
    color: aliceblue;
}`

const Button1 = () => {
    return(
        <StylesWrapper1>
            <button>
                <span className="transition" />
                <span className="gradient" />
                <span className="label">Aku Sudah Di Klick</span>
            </button> 
        </StylesWrapper1>
    )
}

const StylesWrapper1 = styled.div`
button {
    font-size: 17px;
    padding: 1em 2.7em;
    font-weight: 500;
    background: #1f2937;
    color: white;
    border: none;
    position: relative;
    overflow: hidden;
    border-radius: 0.6em;
    cursor: pointer;
    transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1); /* Sesuaikan dengan Tailwind */
}

.gradient {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 0.6em;
    margin-top: -0.25em;
    background-image: linear-gradient(
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.3)
    );
}

.label {
    position: relative;
    top: -1px;
}

.transition {
    transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1); /* Sesuaikan dengan Tailwind */
    background-color: rgba(16, 185, 129, 0.6);
    border-radius: 9999px;
    width: 0;
    height: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

button:hover .transition {
    width: 14em;
    height: 14em;
}

button:active {
    transform: scale(0.97);
}`;

const Page = () => {
    return(
            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                <Button />
                <Buttons />
                <Button1 />
            </div>
    )
}

export default Page;