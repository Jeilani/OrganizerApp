import React from "react"
import Event from "./maincontentsub/Event.js"
import DaysOfTheWeek from "./maincontentsub/DaysOfTheWeek"
import ToDoSection from "./maincontentsub/ToDoSection"
import JournalSection from "./maincontentsub/JournalSection"
import CalendarSection from "./maincontentsub/CalendarSection"
import "../CSSFiles/MainContent.css"
import "../CSSFiles/Main.css"


class MainContent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            time: new Date (),
            clickedDate: new Date(),
            daily: [],
            events: [],
            journal: [],
            misc: [],
            general: []
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

    load = stateName => {
        if (stateName === "journal"){
            let URL = stateName + "/" + this.state.clickedDate.getFullYear() + "/" +  this.state.clickedDate.getMonth() + "/" +  this.state.clickedDate.getDate() + "/" + this.props.userId
            fetch("/api/" + URL)
            .then(res=>{
                if(!res.ok){
                    throw Error
                }
                else return res.json()
            })
            .then(todo=>{
                if (todo.name === "nothing"){
                    this.setState({
                        [stateName]: {
                            name: "nothing!@#"
                        }
                    })
                } else {
                    this.setState({
                        [stateName]: {...todo}
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })

        } else {
            let URL = stateName + "/" + this.state.clickedDate.getFullYear() + "/" +  this.state.clickedDate.getMonth() + "/" +  this.state.clickedDate.getDate() + "/" + this.props.userId
            fetch("/api/" + URL)
            .then(res=>{
                if(!res.ok){
                    throw Error
                }
                else return res.json()
            })
            .then(todos=>{
                const newtodos = todos.sort((a,b)=>{
                    return a.date - b.date
                })
                this.setState({
                    [stateName]: newtodos
                })
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    updateJournal = (id, inputValue) =>{
        fetch("api/journal/" + id, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                name: inputValue
                })
            })
            .then(res=>{
                return res.json()
            })
            .then(todo=>{
                this.setState({
                    journal: {...todo}
                })
            })
            .catch(err=>{
                console.log(err)
            })
    }

    handleSubmit = (event, stateName, inputValue) =>{
        let hour;
        let minutes;
        if (stateName === "daily"){
            hour = event.target.timestamp.value.substring(0, 2)
            minutes = event.target.timestamp.value.substring(3)
        }
        let year = this.state.clickedDate.getFullYear()
        let month = this.state.clickedDate.getMonth()
        let smalldate = this.state.clickedDate.getDate()
        let newObject = {
            name: inputValue,
            date: new Date (year, month, smalldate),
            userId: this.props.userId
        }
        if (stateName === "daily"){
            newObject = {
                name: inputValue,
                date: new Date (year, month, smalldate, hour,  minutes),
                userId: this.props.userId
            }
        }

        fetch("/api/" + stateName, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({...newObject})
        })
        .then(res=>{
            if(!res.ok){
                throw Error
            }
            else return res.json()
        })
        .then(todo=>{
            this.setState(prevState=>{
                if (stateName === "journal"){
                    return {
                        journal: todo
                    }
                }

                return {
                    [stateName]: [...prevState[stateName], todo]
                }
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

//used to be handleDailyDelete

    handlePostAndDelete = (id, methodType, stateName, completedd) =>{
        console.log(methodType)
        if (methodType === "put"){
                fetch("/api/" + stateName + "/" + id, {
                method: methodType,
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    completed: !completedd
                    })
                })
                .then(res=>{
                    if(!res.ok){
                        throw Error
                    }
                    return res.json()
                })
                .then(todos=>{
                    this.setState(prevState=>{
                    let newArray = prevState[stateName].filter(todo=>!(todo._id === id))
                        return {
                            [stateName]: [...newArray, todos]
                        }
                    })
                })
                .catch(err=>{
                    console.log(err)
                })
        } else if (methodType === "delete") {
            fetch("/api/" + stateName + "/" + id, {
                method: methodType,
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(res=>{
                if(!res.ok){
                    throw Error
                }
                return
            })
            .then(()=>{
                this.setState(prevState=>{
                    let newArray = prevState[stateName].filter(todo=>!(todo._id === id))
                    return {
                        [stateName]: [...newArray]
                    }
                })


            })
            .catch(err=>{
                console.log(err)
            })
        }


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

    callAllAPIS = async() => {
        await this.load("daily")
        await this.load("events")
        await this.load("general")
        await this.load("misc")
        await this.load("journal")
    }

    componentDidMount(){
        this.callAllAPIS()
        this.pushDay(this.DaysOfTheWeek)
        this.pushSixthDay(this.DaysOfTheWeek)
        this.setState({
            daysOfTheWeek: this.DaysOfTheWeek.splice()
        })
    }

    handleClickedDate = async element => {
        let year = this.state.time.getFullYear()
        let month = this.state.time.getMonth()
        let day = element;
        await this.setState({
            clickedDate: new Date(year, month, day)
            })
        this.callAllAPIS()
    }

    render(){
        this.pushDay(this.DaysOfTheWeek)
        this.pushSixthDay(this.DaysOfTheWeek)
        const newDayList = this.DaysOfTheWeek.map((day, index)=> <DaysOfTheWeek monthObjects={this.state.monthObjects} key={index} Date = {this.state.time} data={day} handleClickedDate={this.handleClickedDate} clickedDate={this.state.clickedDate}/>)
        return(
            <div className="WholePage">
                <div className="beginning">
                    <Event
                     clickedDate={this.state.clickedDate}
                     events = {this.state.events}
                     handleSubmit = {this.handleSubmit}
                     handlePostAndDelete = {this.handlePostAndDelete}
                     months = {this.months}
                     logout={this.props.logout}
                     userId = {this.props.userId}
                    />
                </div>
                <div className="MainContent">
                    <ToDoSection
                        clickedDate={this.state.clickedDate}
                        general = {this.state.general}
                        misc={this.state.misc}
                        handleSubmit = {this.handleSubmit}
                        handlePostAndDelete = {this.handlePostAndDelete}
                        daily = {this.state.daily}
                    />
                    <CalendarSection
                        newDayList={newDayList}
                        changeMonthLeft={this.changeMonthLeft}
                        changeMonthRight={this.changeMonthRight}
                        months = {this.months}
                        date = {this.state.time}
                        userId={this.props.userId}
                    />
                    <JournalSection
                        clickedDate = {this.state.clickedDate}
                        handleSubmit = {this.handleSubmit}
                        updateJournal = {this.updateJournal}
                        journal = {this.state.journal}
                    />
                </div>
            </div>
        )
    }
}

export default MainContent