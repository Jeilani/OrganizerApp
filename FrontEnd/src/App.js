import React from "react"
import Header from "./Components/Header.js"
import MainContent from "./Components/MainContent"


class App extends React.Component{
    constructor(){
        super()
        this.state = {
            currentUser: {

            }
        }
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