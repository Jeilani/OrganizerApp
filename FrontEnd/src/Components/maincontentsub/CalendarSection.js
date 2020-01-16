import React from "react";
import "../../CSSFiles/MainContent.css"

class CalendarSection extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            monthJournal: [],
            monthDaily: [],
            monthEvents: []

        }
    }
 loadMonthObjects = objectName => {
    fetch("/api/" + objectName)
    .then(res=>{
        if(!res.ok){
            throw Error
        }
        else return res.json()
    })
    .then(todo=>{
            this.setState({
                [objectName]: {...todo}
            })
    })
    .catch(err=>{
        console.log(err)
    })

 }

    render() {
        return(
            <div className="middle">
                <div className="calendarsection">
                    <div className = "monthtitle">
                        <h2>
                            <i name="leftarrow" onClick={this.props.changeMonthLeft} className="fas fa-arrow-left fa-xs"></i>
                            <span id ="month">{this.props.months[this.props.clickedDate.getMonth()]}</span>
                            <i onClick={this.props.changeMonthRight}className="fas fa-arrow-right fa-xs"></i>
                        </h2>
                        <ul>
                            <li><span id="dateicon">23</span>Clicked Date</li>
                        </ul>
                        <h3 id="year">{this.props.clickedDate.getFullYear()}</h3>
                    </div>
                    <div className="weekdatesection">
                        {this.props.newDayList}
                    </div>
                </div>
            </div>
        )
    }
}

export default CalendarSection