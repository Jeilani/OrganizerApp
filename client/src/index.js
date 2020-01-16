import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter} from "react-router-dom"
import App from "./App.js"


const body = document.getElementById("root");

ReactDOM.render(
<BrowserRouter>
    <App/>
</BrowserRouter>
, body);