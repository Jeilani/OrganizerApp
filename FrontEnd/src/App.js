import React from "react"
import {Route} from "react-router-dom"
import Landing from "./Landing.js"
import MainContent from "./Components/MainContent"


class App extends React.Component{
    render(){
        return(
            <div>
                <Route exact path = "/" component={Landing}></Route>
                <Route exact path = "/home" component={Landing}></Route>
                <Route exact path="/calendar" component={MainContent}></Route>
           </div>
        )
    }
}


export default App