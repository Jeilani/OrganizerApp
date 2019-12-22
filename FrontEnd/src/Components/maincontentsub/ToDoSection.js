import React from "react"
import "../../CSSFiles/ToDo.css"
import FirstTodos from "./todosectionsub/FirstTodos"
import SecondTodos from "./todosectionsub/SecondTodos"

class ToDoSection extends React.Component{
    constructor(props){
        super()
    }
    render(){
        return(
            <div className="left">
                <FirstTodos clickedDate={this.props.clickedDate}/>
                <SecondTodos clickedDate={this.props.clickedDate}/>
            </div>
        )
    }
}



export default ToDoSection