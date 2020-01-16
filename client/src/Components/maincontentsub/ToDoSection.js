import React from "react"
import "../../CSSFiles/ToDo.css"
import FirstTodos from "./todosectionsub/FirstTodos"
import SecondTodos from "./todosectionsub/SecondTodos"

const ToDoSection = props =>{
        return(
            <div className="left">
                <FirstTodos
                clickedDate={props.clickedDate}
                handleSubmit = {props.handleSubmit}
                handlePostAndDelete = {props.handlePostAndDelete}
                daily = {props.daily}
                />
                <SecondTodos
                clickedDate={props.clickedDate}
                general = {props.general}
                misc = {props.misc}
                handleSubmit = {props.handleSubmit}
                handlePostAndDelete = {props.handlePostAndDelete}
                />

            </div>
        )
}



export default ToDoSection