import React from "react"
import "../../CSSFiles/Journal.css"

class JournalSection extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ReadMode: true,
            inputValue: "",
            stateJournalName: this.props.journal.name,
            alreadySubmitted: false
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.journal.name === "nothing!@#" && !(prevState.stateJournalName === "nothing!@#")){
            return {
                inputValue: "",
                stateJournalName: nextProps.journal.name
            }
        } else if (!(nextProps.journal.name === prevState.stateJournalName)){
            return {
                inputValue: nextProps.journal.name,
                stateJournalName: nextProps.journal.name
            }
        }
    }

    handleSubmit = event =>{
        if (!(this.state.stateJournalName === "nothing!@#")){
            console.log("updatejournal")
            this.props.updateJournal(this.props.journal._id, this.state.inputValue)
        }
        else if (this.state.stateJournalName === "nothing!@#"){
            this.props.handleSubmit(event, "journal", this.state.inputValue)
        }
        this.handleReadMode()

    }

    handleInputChange = event=>{
        this.setState({
            inputValue: event.target.value
        })
    }

    renderPageType = () =>{
        if (this.state.ReadMode){
            return(
            <form onSubmit = {()=>{this.handleSubmit()}}className="journalForm">
                <textarea
                    readOnly={true}
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                >
                </textarea>
            </form>
            )
        }
        else {
            return(
            <form onSubmit = {()=>{this.handleSubmit()}} className="journalForm">
                <textarea
                    placeholder="type here.."
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                >
                </textarea>
            </form>
            )
        }
    }

    handleReadMode = () =>{
        this.setState(prevState=>{
            let newState = !prevState.ReadMode
            return{
                ReadMode: newState
            }
        })
    }

    handleIcon = () =>{
        if (this.state.ReadMode) {
            return(
            <i onClick={()=>{this.handleReadMode()}}className="fas fa-pen"></i>
            )
         }
             return(
              <i onClick={()=>{this.handleSubmit()}}className="fas fa-check"></i>
             )
    }


    render(){
        return(
                <div id="paper">
                    <div id="pattern">
                    </div>
                    <div className="bodyjournal">
                        <header className="journalHeader">
                            <i className="fas fa-journal-whills"></i>
                            <h4>Notes/Journal</h4>
                        </header>
                        {this.renderPageType()}
                        <footer>
                        {this.handleIcon()}
                        </footer>
                    </div>
                </div>
        )
    }
}


export default JournalSection