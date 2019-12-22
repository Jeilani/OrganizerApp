import React from "react"
import "../../CSSFiles/Event.css"

class Event extends React.Component{
    constructor(props){
        super(props)
        this.state={
            eventInput: "",
            eventList: [
                {
                    name: "Wedding To Go",
                    date: new Date (this.props.clickedDate.getFullYear(), this.props.clickedDate.getMonth(), this.props.clickedDate.getDate())
                }
            ]
        }
    }

    handleChange = event =>{
        this.setState({
            eventInput: event.target.value
        })
    }

    handleSubmit = event =>{
        event.preventDefault()

        let hour = event.target.timestamp.value.substring(0, 2)
        let minutes = event.target.timestamp.value.substring(3)
        let year = this.props.clickedDate.getFullYear()
        let month = this.props.clickedDate.getMonth()
        let date = this.props.clickedDate.getDate()



        this.setState(prevState=>{
            let newObject = {
                name: this.state.todoInputValue,
                date: new Date (year, month, date, hour, minutes)
            }
            return {
                todoInputValue: "",
                todoList: [...prevState.todoList, newObject]
            }
        })
    }

    render(){
    const newEventList = this.state.eventList.map(event=><li>{event.name}</li>)
        return (
            <div className="event">
                <div className="todaysevents">
                    <h5>Todays Events</h5>
                    <form>
                        <input
                            placeholder="add event.."
                            value={this.state.eventInput}
                            onChange={this.handleChange}
                            required
                        ></input>
                        <button type="submit">submit</button>
                    </form>
                    <ul>
                        {newEventList}
                    </ul>
                </div>

                <div className="middleiconcontainer"><i class="animate fas fa-power-off fa-5x"></i></div>

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