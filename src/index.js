import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Stylish from "./js/index.jsx";
import "./css/main.css"

render((
    <BrowserRouter>
        <Stylish />
    </BrowserRouter>
), document.getElementById("cont"));