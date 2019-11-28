import React from "react"
import "../CSSFiles/ToDo.css"

function ToDoSection(){
    return(
        <div className="left">
            <div className="firstlistcontainer listcontainer">
                <ul>
                    <h3>Day's Schedule</h3>
                </ul>
            </div>
            <div className="listcontainer">
                <ul>
                    <h3>Long Term Todo's</h3>
                    <li>Meetup at Code Talent</li>
                    <li>Coffee with ____</li>
                </ul>
                <ul>
                    <h3>Upcoming Events</h3>
                    <li>Wedding April 3</li>
                    <li>Nuggets Game Dec. 24</li>
                </ul>
            </div>
        </div>
    )


}



export default ToDoSection