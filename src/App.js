import React from "react"
import Header from "./components/Header.js"
import MainContent from "./components/MainContent"


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