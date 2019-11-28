import React from "react"
import DaysOfTheWeek from "./DaysOfTheWeek.js"
import ToDoSection from "./ToDoSection.js"
import JournalSection from "./JournalSection"
import "../CSSFiles/MainContent.css"


class MainContent extends React.Component{
    constructor(){
        super()
        this.state = {
            date: new Date (),
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            daysOfTheWeek: [{
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
        this.seventhSpotIsTaken = false;
        this.date = new Date()
    }

        changeMonthLeft = event =>{

            let month = this.state.date.getMonth()
            let year = this.state.date.getFullYear();
            this.setState({
                date: new Date(year, month -1),
                daysOfTheWeek: this.DaysOfTheWeek.splice()
            }
            )

        }

        changeMonthRight = event =>{
            let month = this.state.date.getMonth()
            let year = this.state.date.getFullYear();
            this.setState({
                date: new Date(year, month +1),
                daysOfTheWeek: this.DaysOfTheWeek.splice()
            }
        )
        }

        pushDay = DaysOfTheWeek =>{
            this.seventhSpotIsTaken = false;
            //establish the date for today
            let date = this.state.date;
            //establish the month to use in daysInMonthfunciton to get duration of for loop
            let month = date.getMonth();
            //same reason as above
            let year = date.getFullYear();
            //retrieving the amount of days in the month so I can use it for length of for loop
            let monthLength = new Date(year, month + 1, 0).getDate();

            let firstDay = new Date(year, month, 1).getDay()
            //goes through each day for the given month in the this.todaysDate and checks if it belongs under the dayoftheweek
            DaysOfTheWeek.forEach(dayoftheweek=>{
                dayoftheweek.dates = [];
                for(let i = 0; i < monthLength; i++){
                    let dayInMonth = new Date (year, month, i+1);
                    if(dayInMonth.getDay() === dayoftheweek.value){
                    dayoftheweek.dates.push(i+1)
                    }
                }
            })

            //goes through each day of the week and checks if each date has a missing date slot, if so pushing a "dead date" which gives an empty spot on the calendar
            DaysOfTheWeek.forEach(day=>{
                //determines if saturday gets an extra dead date
                let pushSaturday = day.dates.includes(30) && (firstDay === 6)
                //determines if sunday gets an extra deaddate
                let pushSunday = day.dates.includes(31) && (firstDay === 5 || firstDay === 6)
                if(day.dates.length < 5 || pushSaturday || pushSunday) {
                    if (day.value < new Date(year, month, 1).getDay()) {
                        day.dates.unshift(-10)
                    } else{
                        day.dates.push(-5)
                    }
                }
                if (day.dates.length > 5){
                        this.seventhSpotIsTaken = true
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

        updateStateDays = (weekdays) =>{
                this.setState({
                    daysOfTheWeek: weekdays
                })
        }

        componentWillMount(){
            this.pushDay(this.DaysOfTheWeek)
            this.pushSixthDay(this.DaysOfTheWeek)
            this.setState({
                daysOfTheWeek: this.DaysOfTheWeek.splice()
            })

        }

    render(){
        this.pushDay(this.DaysOfTheWeek)
        this.pushSixthDay(this.DaysOfTheWeek)
        const newDayList = this.DaysOfTheWeek.map((day, index)=><DaysOfTheWeek key={index} Date = {this.state.date} data={day}/>)
        return(
            <div className="MainContent">
                <ToDoSection  />
                <div className="middle">
                    <h1>Organizer</h1>
                    <div className="calendarsection">
                        <div className = "monthtitle">
                            <h2>
                                <i name="leftarrow" onClick={this.changeMonthLeft} className="fas fa-arrow-left fa-xs"></i>
                                <span id ="month">{this.state.months[this.state.date.getMonth()]} </span>
                                 <i onClick={this.changeMonthRight}className="fas fa-arrow-right fa-xs"></i>
                            </h2>
                            <ul>
                            <li><span id="dateicon">23</span>Today's Date</li>
                                <li><i className="fas fa-calendar-week fa-xs"></i>Event(s)</li>
                                <li><i className="fas fa-book fa-xs"></i>Journal Entry</li>
                            </ul>
                            <h3 id="year">{this.state.date.getFullYear()}</h3>
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