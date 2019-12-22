import React from "react"
import {Route} from "react-router-dom"
import Landing from "./Landing.js"
import CalendarPage from "./CalendarPage"

class App extends React.Component{
    render(){
        return(
            <div>
                <Route exact path = "/" component={Landing}></Route>
                <Route exact path = "/home" component={Landing}></Route>
                <Route exact path="/calendar" component={CalendarPage}></Route>
           </div>
        )
    }
}


export default App