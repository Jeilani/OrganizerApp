import React from "react"
import DaysOfTheWeek from "./DaysOfTheWeek.js"
import ToDoSection from "./ToDoSection.js"
import JournalSection from "./JournalSection"


class MainContent extends React.Component{
    constructor(){
        super()
        this.state={
        }
        this.seventhSpotIsTaken = false;
        this.todaysDate = new Date(2019, 0)
        this.dateList = []
        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        this.DaysOfTheWeek = [{
            day: "Sunday",
            value: 0,
            dates: []
        },

        {
             day: "Monday",
             value: 1,
             dates: []

        },

        {
            day: "Tuesday",
            value: 2,
            dates: []

        },

        {
            day: "Wednesday",
            value: 3,
            dates: []
        },
        {
            day: "Thursday",
            value: 4,
            dates: []

        },

        {
            day: "Friday",
            value: 5,
            dates: []

         },

         {
             day: "Saturday",
             value: 6,
             dates: []
         }

        ]
    }

        pushDay = DaysOfTheWeek =>{
            this.seventhSpotIsTaken = false;
            let date = this.todaysDate;
            //establish the date for today
            let month = date.getMonth();
            //establish the month to use in daysInMonthfunciton to get duration of for loop
            let year = date.getFullYear();
            //same reason as above
            let monthLength = new Date(year, month + 1, 0).getDate();
            //retrieving the amount of days in the month so I can use it for length of for loop

            //goes thorugh each day for the given month in the this.todaysDate and checks if it belongs under the dayoftheweek
            DaysOfTheWeek.forEach(dayoftheweek=>{
                for(let i = 0; i < monthLength; i++){
                    let dayInMonth = new Date (year, month, i+1);
                    if(dayInMonth.getDay() === dayoftheweek.value){
                    dayoftheweek.dates.push(i+1)
                    }
                }
            })

            //goes through each day of the week and checks if each date has a missing date slot, if so pushing a "dead date" which gives an empty spot on the calendar
            DaysOfTheWeek.forEach(day=>{
                if(day.dates.length < 5 || day.dates.includes(31)) {
                    if (day.value < new Date(year, month, 1).getDay()) {
                        day.dates.unshift(-10)
                    } else{
                        day.dates.push(-5)
                    }
                }
                if (day.dates.length > 5){
                    this.seventhSpotIsTaken = true;
                }
            })
    }

    pushSixthDay = arr =>{
        if (this.seventhSpotIsTaken) {
            arr.forEach(day=>{
                if (day.dates.length < 6){
                    day.dates.push(-5)
                }
            })
        }

    }

    render(){
        this.pushDay(this.DaysOfTheWeek)
        this.pushSixthDay(this.DaysOfTheWeek)

        const newDayList = this.DaysOfTheWeek.map((day, index)=><DaysOfTheWeek key={index}todaysDate = {this.todaysDate} data={day}/>)
        return(
            <div className="MainContent">
                <ToDoSection  />
                <div className="middle">
                    <hr></hr>
                    <h1>Organizer</h1>
                    <div className="calendarsection">
                        <div className = "monthtitle">
                            <h2>{this.months[this.todaysDate.getMonth()]}</h2>
                            <ul>
                            <li><span id="dateicon">23</span>Today's Date</li>
                                <li><i className="fas fa-calendar-week"></i>Event(s)</li>
                                <li><i className="fas fa-book"></i>Journal Entry</li>
                            </ul>
                        </div>
                        <div className="weekdatesection">
                            {newDayList}
                        </div>

                    </div>
                </div>
                <JournalSection />
            </div>
        )
    }
}

export default MainContent