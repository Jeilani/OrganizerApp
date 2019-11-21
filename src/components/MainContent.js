import React from "react"
import DaysOfTheWeek from "./DaysOfTheWeek.js"
import ToDoSection from "./ToDoSection.js"
import JournalSection from "./JournalSection"


class MainContent extends React.Component{
    constructor(){
        super()
        this.state={
        }
        this.todaysDate = new Date()
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
            let date = new Date();
            //establish the date for today
            let month = date.getMonth();
            //establish the month to use in daysInMonthfunciton to get duration of for loop
            let year = date.getFullYear();
            //same reason as above
            let monthLength = new Date(month, year, 0).getDate();
            //retrieving the amount of days in the month so I can use it for length of for loop

            DaysOfTheWeek.forEach(dayoftheweek=>{
                for(let i = 0; i < monthLength - 1; i++){
                    let dayInMonth = new Date (year, month, i+1);
                    if(dayInMonth.getDay() === dayoftheweek.value){
                    dayoftheweek.dates.push(<span>{i+1}</span>)
                    }
                }
            })

            DaysOfTheWeek.forEach(day=>{
                if(day.dates.length < 5) {
                    if (day.value < new Date(year, month, 1).getDay()) {
                        day.dates.unshift(-10)
                    } else{
                        day.dates.push(-5)
                    }
                }
            })
    }

    render(){
        this.pushDay(this.DaysOfTheWeek)
        const newDayList = this.DaysOfTheWeek.map(day=><DaysOfTheWeek todaysDate = {this.todaysDate} data={day}/>)
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
                                <li><i class="fas fa-calendar-week"></i>Event(s)</li>
                                <li><i class="fas fa-book"></i>Journal Entry</li>
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