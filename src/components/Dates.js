import React from "react"


function Dates (props){
    return(
            <div style={props.style}className="dates"><span id="numberdate">{props.day}</span></div>
        )
}


export default Dates