import React from "react"

class SecondTodos extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            generalTodoInputValue: "",
            miscTodoInputValue: ""

        }
    }

    handleChange = event => {
        this.setState({
            generalTodoInputValue: event.target.value
        })
    }

    handleGeneralSubmit = event =>{
        event.preventDefault()
        this.props.handleSubmit(event, "general", this.state.generalTodoInputValue)
        this.setState({
            generalTodoInputValue: ""
        })
    }
    handleMiscSubmit = event =>{
        event.preventDefault()
        this.props.handleSubmit(event, "misc", this.state.miscTodoInputValue)
        this.setState({
            miscTodoInputValue: ""
        })
    }

    handleMiscChange = event => {
        this.setState({
            miscTodoInputValue: event.target.value
        })
    }

    handleGeneralComplete = (id, completed) =>{
        this.props.handlePostAndDelete(id, "put", "general", completed)
    }

    handleMiscComplete = (id, completed) =>{
        this.props.handlePostAndDelete(id, "put", "misc", completed)
    }

    render(){
        const generalTodoList = this.props.general.map(todo => {
            if (todo.completed){
                return (
                <li style = {{textDecoration: "line-through"}} key={todo._id}>{todo.name}
                    <span>
                        <i onClick={()=>{this.handleGeneralComplete(todo._id, todo.completed)}} className="checkmark fas fa-check"></i>
                        <i onClick = {()=>{this.props.handlePostAndDelete(todo._id, "delete", "general")}} className="far fa-trash-alt"></i>
                    </span>
                </li>)
            } else {
            return (
                <li key={todo._id}>{todo.name}
                    <span>
                        <i onClick={()=>{this.handleGeneralComplete(todo._id, todo.completed)}} className="checkmark fas fa-check"></i>
                        <i onClick = {()=>{this.props.handlePostAndDelete(todo._id, "delete", "general")}} className="far fa-trash-alt"></i>
                    </span>
                </li>
                )
            }
            })

        const miscTodoList = this.props.misc.map(todo=>{
        if (todo.completed){
            return(
            <li style = {{textDecoration: "line-through"}} key={todo._id}>{todo.name}
                <span>
                    <i onClick={()=>{this.handleMiscComplete(todo._id, todo.completed)}} className="checkmark fas fa-check"></i>
                    <i onClick = {()=>{this.props.handlePostAndDelete(todo._id, "delete", "misc")}} className="far fa-trash-alt"></i>
                </span>
            </li>)
        } else {
            return (
                <li key={todo._id}>{todo.name}
                    <span>
                        <i onClick={()=>{this.handleMiscComplete(todo._id, todo.completed)}} className="checkmark fas fa-check"></i>
                        <i onClick = {()=>{this.props.handlePostAndDelete(todo._id, "delete", "misc")}} className="far fa-trash-alt"></i>
                    </span>
                </li>
           )
        }
        })
        return (
        <div className="secondlistcontainer listcontainer">
            <ul>
            <i className="fab fa-elementor"></i>
                <h5>General Goals/Todos</h5>
                <form
                    onSubmit={this.handleGeneralSubmit}>
                    <input
                        type="text"
                        placeholder = "add..."
                        onChange={this.handleChange}
                        value = {this.state.generalTodoInputValue}
                        name="generalTodoInputValue"
                        maxLength = "20"
                    >
                    </input>
                    <button>
                    <i type="submit" onClick={this.handleGeneralSubmit} className="far fa-arrow-alt-circle-down"></i>
                    </button>
                </form>
                <div className="secondlistdiv">
                    {generalTodoList}
                </div>
            </ul>
            <ul>
                <i className="fas fa-cloud-moon-rain"></i>
                <h5>Misc/Grocery List</h5>
                <form
                    onSubmit={this.handleMiscSubmit}>
                    <input
                        type="text"
                        placeholder = "add..."
                        onChange={this.handleMiscChange}
                        value = {this.state.MiscTodoInputValue}
                        name="miscTodoInputValue"
                        maxLength = "20"
                    >
                    </input>
                    <button>
                    <i type="submit" onClick={this.handleMiscSubmit} className="far fa-arrow-alt-circle-down"></i>
                    </button>
                </form>
                <div className="secondlistdiv">
                    {miscTodoList}
                </div>
            </ul>
        </div>
        )
    }
}


export default SecondTodos