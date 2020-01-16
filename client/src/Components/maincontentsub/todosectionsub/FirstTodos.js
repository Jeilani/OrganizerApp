import React from "react"

class FirstTodos extends React.Component {
    constructor(props){
        super(props)
    this.state = {
        todoInputValue: "",
    }
}

    handleChange = event =>{
        this.setState({
            todoInputValue: event.target.value
        })
    }

    handleComplete = id =>{
        this.props.handlePostAndDelete(id, "put", "daily")
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.handleSubmit(event, "daily", this.state.todoInputValue)
        this.setState({
            todoInputValue: ""
        })
    }

    formatTime = date => {
        var newdate = new Date(date)
        var hours = newdate.getHours();
        var minutes = newdate.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }



    render(){
        const todoList = this.props.daily.sort((a,b)=>a.date - b.date).filter(todo=>!todo.completed).map((t, index)=>{
                return (
                    <li key={index}><b className="timestamp">{this.formatTime(t.date)}</b><span className="liname">{t.name}</span><span className="liicons"><i onClick={()=>{this.handleComplete(t._id)}} className="checkmark fas fa-check"></i><i onClick = {()=>{this.props.handlePostAndDelete(t._id, "delete", "daily")}}className="far fa-trash-alt"></i></span></li>
                )
        })
        const completedTodoList = this.props.daily.filter(todo=>todo.completed).map((t, index)=><li key={index}>{t.name}<i onClick = {()=>{this.props.handlePostAndDelete(t._id, "delete", "daily")}} className="far fa-trash-alt"></i></li>)

        return (
            <div className="firstlistcontainer listcontainer">
                    <ul>
                        <i className="far fa-clock"></i>
                        <h5>Day's Schedule</h5>
                        <div className="listitems">
                            {todoList}
                        </div>
                        <form className="firstForm" onSubmit = {this.handleSubmit}>
                            <input
                                onChange = {this.handleChange}
                                type="text"
                                value={this.state.todoInputValue}
                                placeholder="add todo..."
                                required
                                maxLength = "20">
                            </input>
                            <input
                                className="secondInput"
                                type="time"
                                required
                                name="timestamp"
                                >
                            </input>
                            <button><i type="submit" onClick={this.handleSubmit} className="far fa-arrow-alt-circle-down"></i></button>
                        </form>
                    </ul>

                    <ul>
                        <i className="fas fa-check"></i>
                        <h5>Completed</h5>
                        <div  className="listitems completedlistitems">
                            {completedTodoList}
                        </div>
                    </ul>
            </div>
        )
    }


}

export default FirstTodos