import React from "react"

class FirstTodos extends React.Component {
    constructor(props){
        super(props)
    this.state = {
        todoInputValue: "",
        todoDateValue: {},
        todoList: [{
            name: "play basketball",
            date: new Date ()
        }],
        completedTodoList: []
    }
}
    formatTime = date => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    handleChange = event =>{
        this.setState({
            todoInputValue: event.target.value
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

    handleTodoDelete = (todoListItem, type) =>{
        this.setState(prevState=>{
            let newArray = prevState.todoList.filter(listItem=>listItem !== todoListItem);

            return {
                todoList: newArray
            }

        })

    }
    handleCompletedTodoDelete = (todoListItem, type) =>{
        this.setState(prevState=>{
            let newArray = prevState.completedTodoList.filter(listItem=>listItem !== todoListItem);

            return {
                completedTodoList: newArray
            }

        })

    }

    handleCompleted = (todoListItem) =>{
        this.setState(prevState=>{
            let newArray = prevState.todoList.filter(listItem=>listItem !== todoListItem);

            return {
                todoList: newArray,
                completedTodoList: [...prevState.completedTodoList, todoListItem]
            }
        })
    }


    render(){
        const sortedArray = this.state.todoList.sort((a, b)=>new Date(a.date) - new Date(b.date));
        const todoList = sortedArray.map(t=><li><span id="timestamp">{this.formatTime(t.date)}</span>{t.name}<span><i onClick={()=>{this.handleCompleted(t)}}class="checkmark fas fa-check"></i><i onClick = {()=>{this.handleTodoDelete(t)}} class="far fa-trash-alt"></i></span></li>)
        const completedTodoList = this.state.completedTodoList.map(t=><li>{t.name}<i onClick = {()=>{this.handleCompletedTodoDelete(t)}} class="far fa-trash-alt"></i></li>)
        return (
            <div className="firstlistcontainer listcontainer">
                    <ul>
                        <i class="far fa-clock"></i>
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
                                required>
                            </input>
                            <input
                                className="secondInput"
                                type="time"
                                name="timestamp"
                                required>
                            </input>
                            <button
                                type="submit">submit</button>
                        </form>
                    </ul>

                    <ul>
                        <i class="fas fa-check"></i>
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