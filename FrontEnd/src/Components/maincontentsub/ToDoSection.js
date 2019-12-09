import React from "react"
import "../../CSSFiles/ToDo.css"

function ToDoSection(){
    return(
        <div className="left">
            <div className="firstlistcontainer listcontainer">
                <ul>
                    <h5>Day's Schedule</h5>
                    <li>Playing basketball</li>
                </ul>
                <ul>
                    <h5>Tasks Completed</h5>
                </ul>
            </div>
            <hr></hr>
            <hr id="vertical"></hr>
            <div className="listcontainer">
                <ul>
                    <h5>Long Term Todo's</h5>
                    <li>Meetup at Code Talent</li>
                    <li>Coffee with someone</li>
                </ul>
                <ul>
                    <h5>Upcoming Events</h5>
                    <li>Wedding April 3</li>
                    <li>Nuggets Game Dec. 24</li>
                </ul>
            </div>
        </div>
    )


}



export default ToDoSection