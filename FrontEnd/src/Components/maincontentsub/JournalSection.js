import React from "react"
import "../../CSSFiles/Journal.css"

// I woke up today and immediately executed my morning routine without spending any time on my iPhone.

// I also immediately got dressed and went to Starbucks so I could knock out the required study session.

// After spending 5 hours at Starbucks I went to the gym after. I hit back and biceps.

// After the gym, I got in a couple more hours of studying at home and called it a night. Slight bit of a boring day but I'm glass I got a lot of things done.



class JournalSection extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page:"",
            month: "",
            inputValue: ""
        }
    }

    handleInputChange = event=>{
        this.setState({
            inputValue: event.target.value
        })
    }

    render(){
        return(
            <div className="right">
            <header>
                <h2>Journal</h2>
                <i className="fas fa-pencil-alt"></i>
            </header>
            <form>
            <textarea
                value={this.state.inputValue}
                onChange={this.handleInputChange}
                >

            </textarea>
            </form>
        </div>
        )
    }
}


export default JournalSection