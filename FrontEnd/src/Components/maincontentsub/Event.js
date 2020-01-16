import React from "react"
import "../../CSSFiles/Event.css"

class Event extends React.Component{
    constructor(props){
        super(props)
        this.state={
            eventInput: "",
            upcomingEvents: [],
            logoutScreen: false
        }
    }

    toggleLogout = event =>{
        event.preventDefault()
        this.setState(prevState=>{
            return {
                logoutScreen: !prevState.logoutScreen
            }
        })
    }

    renderPowerButton = () =>{
        if (!this.state.logoutScreen) {
        return(
            <div className="middleiconcontainer"><i onClick = {this.toggleLogout} className="animate fas fa-power-off fa-5x"></i></div>
        )
        } else if (this.state.logoutScreen) {
        return (
            <div className="logoutcontainer"><div>Are you sure you want to logout?</div><div><button onClick={this.props.logout} id = "yesbutton">Yes</button><button onClick = {this.toggleLogout} id ="nobutton">No</button></div></div>
        )
        }
    }

    getUpcomingEvents = () =>{
        fetch("/api/events/" + this.props.userId)
        .then(res=>{
            if (!res.ok){
                throw Error
            }
            return res.json()
        })
        .then(todos=>{
            this.setState({
                upcomingEvents: todos
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    handleChange = event =>{
        this.setState({
            eventInput: event.target.value
        })
    }

    handleEventSubmit = event =>{
        event.preventDefault()
        this.props.handleSubmit(event, "events", this.state.eventInput)
        this.setState({
            eventInput: ""
        })
        this.getUpcomingEvents()
    }

    componentDidMount(){
        this.getUpcomingEvents()
    }

    render(){
    const newEventList = this.props.events.map((event, index)=><li key={index}>{event.name}<i onClick = {()=>{this.props.handlePostAndDelete(event._id, "delete", "events")}} className="far fa-trash-alt"></i></li>)
    const upcomingEvents = this.state.upcomingEvents.map(event=><li key={event._id }><span>{event.name + "--- "}</span> <span id="datepartevent">{this.props.months[new Date(event.date).getMonth()] + " " + new Date(event.date).getDate()}</span></li>)
    return (
            <div className="event">
                <div className="todaysevents">
                    <h5>Clicked Day's Events</h5>
                    <form onSubmit={this.handleEventSubmit}>
                        <input
                            placeholder="add event.."
                            value={this.state.eventInput}
                            onChange={this.handleChange}
                            required
                            maxLength = "25"
                        ></input>
                        <input
                            className="secondInput"
                            type="time"
                            required
                            name="timestamp"
                            >
                        </input>
                        <button type="submit">submit</button>
                    </form>
                    <ul>
                        {newEventList}
                    </ul>
                </div>

                {this.renderPowerButton()}

                <div className="upcomingevents">
                    <h5>Upcoming Events</h5>
                    <ul>
                        {upcomingEvents}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Event