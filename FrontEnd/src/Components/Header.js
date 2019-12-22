import React from "react"
import {Link} from "react-router-dom"
import "../CSSFiles/Header.css"

function Header (){
    return (
        <header  className="header">
            <ul>
                <Link className="links"></Link>
                <Link className="links" to="/home">Logout</Link>
            </ul>

        </header>
    )
}

export default Header