import React from "react"

class SecondTodos extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            generalTodoInputValue: "",
            generalTodoList: [
                {
                    name: "Meetup at Code Talent",
                    date: new Date ()
                },
                {
                    name: "Coffee With Someone",
                    date: new Date ()
                },
            ],
            miscTodoInputValue:"",
            miscTodoList:[
                {
                    name: "But potatoes",
                    date: new Date ()
                },
                {
                    name:"poop",
                    date: new Date ()
                },
                {
                    name: "fart",
                    date: new Date ()
                }
            ]

        }
    }

    handleChange = event => {
        this.setState({
            generalTodoInputValue: event.target.value
        })
    }

    handleSubmit = event =>{
        event.preventDefault()

        let year = this.props.clickedDate.getFullYear()
        let month = this.props.clickedDate.getMonth()
        let date = this.props.clickedDate.getDate()



        this.setState(prevState=>{
            let newObject = {
                name: this.state.generalTodoInputValue,
                date: new Date (year, month, date)
            }
            return {
                generalTodoInputValue: "",
                generalTodoList: [...prevState.generalTodoList, newObject]
            }
        })
    }

    handleMiscChange = event => {
        this.setState({
            miscTodoInputValue: event.target.value
        })
    }

    handleMiscSubmit = event =>{
        event.preventDefault()

        let year = this.props.clickedDate.getFullYear()
        let month = this.props.clickedDate.getMonth()
        let date = this.props.clickedDate.getDate()



        this.setState(prevState=>{
            let newObject = {
                name: this.state.miscTodoInputValue,
                date: new Date (year, month, date)
            }
            return {
                miscTodoInputValue: "",
                miscTodoList: [...prevState.miscTodoList, newObject]
            }
        })
    }


    render(){
        const generalTodoList = this.state.generalTodoList.map(todo =><li>{todo.name}</li>)
        const miscTodoList = this.state.miscTodoList.map(todo=><li>{todo.name}</li>)
        return (
        <div className="secondlistcontainer listcontainer">
            <ul>
            <i class="fab fa-elementor"></i>
                <h5>General Goals/Todos</h5>
                <form
                    onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder = "add"
                        onChange={this.handleChange}
                        value = {this.state.generalTodoInputValue}
                        name="generalTodoInputValue"
                    >
                    </input>
                    <button>
                        submit
                    </button>
                </form>
                <div>
                    {generalTodoList}
                </div>
            </ul>
            <ul>
                <i class="fas fa-cloud-moon-rain"></i>
                <h5>Misc/Grocery List</h5>
                <form
                    onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder = "add"
                        onChange={this.handleMiscChange}
                        value = {this.state.MiscTodoInputValue}
                        name="miscTodoInputValue"
                    >
                    </input>
                    <button>
                        submit
                    </button>
                </form>
                <div>
                    {miscTodoList}
                </div>
            </ul>
        </div>
        )
    }
}


export default SecondTodos