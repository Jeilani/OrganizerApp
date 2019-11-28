import React from "react"
import Header from "./functionalComponents/Header.js"
import MainContent from "./functionalComponents/MainContent"


class App extends React.Component{
    constructor(){
        super()
        this.state = {}
    }

    render(){
        return(
            <div id="container">
                <Header/>
                <MainContent />
            </div>
        )
    }
}


export default App