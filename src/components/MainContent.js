import React from "react"
import Dates from "./Dates.js"
import DeadDate from "./DeadDate.js"
import DaysOfTheWeek from "./DaysOfTheWeek.js"


class MainContent extends React.Component{
    constructor(){
        super()
        this.state={
            dateSlots: 35

        }
        this.dateList = []
        this.todaysDate = new Date()
        this.daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    }
        daysInMonth (month, year) {
        return new Date(year, month +1 , 0).getDate();
    }

    pushDates = () => {
        let DeadDateSlots = 0;
        let month = this.todaysDate.getMonth();
        let year = this.todaysDate.getFullYear();
        let monthLength = this.daysInMonth(month, year);
        let firstday = new Date(year, month, 1);
        let dayoffirstday = firstday.getDay();

            if (dayoffirstday === 1){
            DeadDateSlots++
         } else if (dayoffirstday === 2){
            DeadDateSlots = DeadDateSlots += 2
         } else if (dayoffirstday ===3){
            DeadDateSlots = DeadDateSlots +=3
         } else if (dayoffirstday ===4){
            DeadDateSlots = DeadDateSlots += 4
         } else if (dayoffirstday === 5){
            DeadDateSlots = DeadDateSlots += 5
         } else if (dayoffirstday === 6){
            DeadDateSlots = DeadDateSlots += 6
         }


         for(let i = 0; i < DeadDateSlots; i++){
            this.dateList.push(<DeadDate/>)
         }

         for(let i = 0; i < monthLength; i++){
             if(this.todaysDate.getDate() === (i+1)){
                 this.dateList.push(<Dates
                    style={
                        {borderColor: "rgb(181, 33, 33)",
                        }
                 }
                    day={i+1}/>)

             } else{
                 this.dateList.push(<Dates day={i+1}/>)
             }
        }


    }




    render(){

        //creates a span element for everyday of the week and puts them in a list
        const daysOfTheWeekElements = this.daysOfTheWeek.map(day=><span>{day}</span>);
        this.pushDates()
        return(
            <div className="MainContent">
                <h1>Organizer</h1>
                <div className="calendarsection">
                    <div className = "monthtitle">
                        <h2>{this.months[this.todaysDate.getMonth()]}</h2>
                    </div>
                    <div className="weekdatesection">
                        <div className="daysoftheweek">
                            {daysOfTheWeekElements}
                        </div>
                        <div className="datesection">
                            {this.dateList}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainContent