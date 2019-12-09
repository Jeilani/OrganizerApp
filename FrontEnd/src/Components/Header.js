import React from "react"
import "../CSSFiles/Header.css"

function Header (){
    return (
        <header  className="header">
            <ul>
                <li className="navbarelements"><a href="http://www.google.com">Sign Up</a></li>
                <li className="navbarelements"><a href="http://www.google.com">Login</a></li>
            </ul>

        </header>
    )
}

export default Header