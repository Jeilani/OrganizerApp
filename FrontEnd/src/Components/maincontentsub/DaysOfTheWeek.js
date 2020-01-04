import React from "react"

function DaysOfTheWeek (props) {
    let clickedDate = props.clickedDate;
    // let propMonth = props.Date.getMonth();
    let eventIcon = <i className="fas fa-calendar-week fa-xs"></i>
    let journalIcon = <i className="fas fa-book fa-xs"></i>;

    const dateList = props.data.dates.map((element, index)=>{
        // let dateObjects = props.monthObjects.filter(object=> object.date.getDate() === element)
        if (element < 0) {
            return( <span onClick={()=>{props.handleClickedDate(element)}} key={index} className="deaddate"><span className="dateNumber">{element}</span><span className="dateIcon clearIcon">{eventIcon}{journalIcon}</span></span> )

        // } else if (dateObjects[0] && element === clickedDate.getDate && propMonth === dateObjects[0].date.getMonth()) {
        //     return( <span onClick={()=>{props.handleClickedDate(element)}} key={index} className="dates" style={{color: "rgb(168, 66, 50)"}}><span className="dateNumber">{element}</span><span className="dateIcon">{eventIcon}{journalIcon}</span></span> )
        // } else if (dateObjects[0] && dateObjects[0].date.getMonth() === propMonth) {
        //     return(<span onClick={()=>{props.handleClickedDate(element)}} key={index} className="dates"><span className="dateNumber">{element}</span><span className="dateIcon">{eventIcon}{journalIcon}</span></span>)
        } else if (element === clickedDate.getDate() && clickedDate.getMonth() === props.Date.getMonth()) {
            return(<span onClick={()=>{props.handleClickedDate(element)}} key={index} style={{color: "rgb(128, 0, 0)", borderColor: "rgb(168, 66, 50)"}} className="dates"><span className="dateNumber">{element}</span><span className="dateIcon clearIcon">{eventIcon}{journalIcon}</span></span> )
        } else {
            return( <span onClick={()=>{props.handleClickedDate(element)}} key={index} className="dates"><span className="dateNumber">{element}</span><span className="dateIcon clearIcon">{eventIcon}{journalIcon}</span></span> )
        }
    })

    return (
            <div className="datecolumns">
                <div className="dayoftheweek"><h4>{props.data.day}</h4></div>
                <div className="individualdates">{dateList}</div>
            </div>
            )
}

export default DaysOfTheWeek