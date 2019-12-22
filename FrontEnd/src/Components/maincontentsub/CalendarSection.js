import React from "react";
import "../../CSSFiles/MainContent.css"

const CalendarSection = props => {
    return(
        <div className="middle zoom">
            <div className="calendarsection">
                <div className = "monthtitle">
                    <h2>
                        <i name="leftarrow" onClick={props.changeMonthLeft} className="fas fa-arrow-left fa-xs"></i>
                        <span id ="month">{props.months[props.date.getMonth()]} </span>
                        <i onClick={props.changeMonthRight}className="fas fa-arrow-right fa-xs"></i>
                    </h2>
                    <ul>
                    <li><span id="dateicon">23</span>Clicked Date</li>
                        <li><i className="legendjournal fas fa-book fa-xs"></i>Journal Entry</li>
                        <li><i className="legendevent fas fa-calendar-week fa-xs"></i>Event(s)</li>
                    </ul>
                    <h3 id="year">{props.date.getFullYear()}</h3>
                </div>
                <div className="weekdatesection">
                    {props.newDayList}
                </div>
            </div>
        </div>
    )
}

export default CalendarSection