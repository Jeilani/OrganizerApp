import React from "react"
import "../../CSSFiles/Event.css"

class Event extends React.Component{
    constructor(props){
        super(props)
        this.state={
            eventInput: "",
        }
    }

    getUpcomingEvents = () =>{
        fetch("/api/events")
        .then(res=>{
            if (!res.ok){
                throw Error
            }
            return res.json()
        })
        .then()
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
    }

    render(){
    const newEventList = this.props.events.map((event, index)=><li key={index}>{event.name}<i onClick = {()=>{this.props.handlePostAndDelete(event._id, "delete", "events")}} className="far fa-trash-alt"></i></li>)
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
                            maxLength = "15"
                        ></input>
                        <button type="submit">submit</button>
                    </form>
                    <ul>
                        {newEventList}
                    </ul>
                </div>

                <div className="middleiconcontainer"><i className="animate fas fa-power-off fa-5x"></i></div>

                <div className="upcomingevents">
                    <h5>Upcoming Events</h5>
                    <ul>
                        <li>dummy event</li>
                        <li>dummy event</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Event