import React from "react"
import DaysOfTheWeek from "./maincontentsub/DaysOfTheWeek"
import ToDoSection from "./maincontentsub/ToDoSection"
import JournalSection from "./maincontentsub/JournalSection"
import CalendarSection from "./maincontentsub/CalendarSection"
import "../CSSFiles/MainContent.css"

const currentTime = new Date ();

class MainContent extends React.Component{
    constructor(){
        super()
        this.state = {
            time: new Date (),
            clickedDate: currentTime.getDate(),
            monthObjects: [{
                todoListEvents: ["Gym", "Groceries"],
                todoLIstElement: ["Coffee Meetup", "Study 4 hours"],
                JournalEntry: ["blah blah blah blah", "blah blah blah blah blah"],
                dayOfTheWeek: "Sunday",
                date: 1

            },
            {
                todoListEvents: ["Gym", "Groceries"],
                todoLIstElement: ["Coffee Meetup", "Study 4 hours"],
                JournalEntry: ["blah blah blah blah", "blah blah blah blah blah"],
                dayOfTheWeek: "Wednesday",
                date: 18

            },
            {
                todoListEvents: ["Gym", "Groceries"],
                todoLIstElement: ["Coffee Meetup", "Study 4 hours"],
                JournalEntry: ["blah blah blah blah", "blah blah blah blah blah"],
                dayOfTheWeek: "Friday",
                date: 20

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
        this.seventhSpotIsTaken = false
        this.date = new Date()
        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    }

        changeMonthLeft = event =>{

            let month = this.state.time.getMonth()
            let year = this.state.time.getFullYear();
            this.setState({
                time: new Date(year, month -1),
            }
            )

        }

        changeMonthRight = event =>{
            let month = this.state.time.getMonth()
            let year = this.state.time.getFullYear();
            this.setState({
                time: new Date(year, month +1),
            }
        )
        }

        pushDay = DaysOfTheWeek =>{
            this.seventhSpotIsTaken = false;
            //establish the date for today
            let date = this.state.time;
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

        UNSAFE_componentWillMount(){
            this.pushDay(this.DaysOfTheWeek)
            this.pushSixthDay(this.DaysOfTheWeek)
            this.setState({
                daysOfTheWeek: this.DaysOfTheWeek.splice()
            })

        }

        handleClickedDate = (element) => {
            this.setState({
                clickedDate: element
            })
        }

    render(){
        this.pushDay(this.DaysOfTheWeek)
        this.pushSixthDay(this.DaysOfTheWeek)

    const newDayList = this.DaysOfTheWeek.map((day, index)=> <DaysOfTheWeek monthObjects={this.state.monthObjects} key={index} Date = {this.state.time} data={day} handleClickedDate={this.handleClickedDate} clickedDate={this.state.clickedDate}/>)
        return(
            <div className="MainContent">
                <ToDoSection
                    todoList={this.state.todoList}
                    eventList={this.state.eventList}
                    dailyScheduleList={this.dailyScheduleList}
                />
                <CalendarSection
                    newDayList={newDayList}
                    changeMonthLeft={this.changeMonthLeft}
                    changeMonthRight={this.changeMonthRight}
                    months = {this.months}
                    date = {this.state.time}

                />
                <JournalSection
                    date={this.state.time}
                    monthObjects={this.monthObjects}
                    clickedDate = {this.state.clickedDate}
                />
            </div>
        )
    }
}

export default MainContent