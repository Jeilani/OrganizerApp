import React from "react"

function DaysOfTheWeek (props) {
    let currentDate = new Date();

    const dateList = props.data.dates.map((date, index)=>{
        if(date < 0){
            return(
            <span key={index} className="deaddate">{date}</span>
            )
        } else{
            if (date === currentDate.getDate() && props.Date.getMonth() === currentDate.getMonth()) {
                return(
                        <span key={index} style={{color: "red",
                        borderColor: "rgb(168, 66, 50)"}} className="dates">{date}</span>
                )
            } else{
                return(
                        <span key={index} className="dates">{date}</span>
            )
            }
        }
    });

    console.log(props.data.day)
    return (

            <div className="datecolumns">
                <div className="dayoftheweek"><h4>{props.data.day}</h4></div>
                <div className="individualdates">{dateList}</div>
            </div>

    )
}








export default DaysOfTheWeek