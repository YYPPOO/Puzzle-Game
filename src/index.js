import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import PuzzleGame from "./js/index.jsx";
import "./css/main.css"

render((
    <BrowserRouter>
        <PuzzleGame />
    </BrowserRouter>
), document.getElementById("cont"));