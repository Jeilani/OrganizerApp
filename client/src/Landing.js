import React from "react"
import "./CSSFiles/Landing.css"



class Landing extends React.Component{
    constructor(props){
        super(props)
        this.state = {


        }
    }

    handleSignUpSubmit = event =>{
        event.preventDefault()
        this.props.onSignUp(this.state.usernameInput, this.state.emailInput, this.state.passwordInput)
    }

    handleSignInSubmit = event =>{
        event.preventDefault()
        this.setState({
            usernameInput: '',
            emailInput: '',
            passwordInput: ''
        })
    }
    onUsernameChange = event =>{
        event.preventDefault()
        this.setState({
            usernameInput: event.target.value
        })
    }
    onPasswordChange = event =>{
        event.preventDefault()
        this.setState({
            passwordInput: event.target.value
        })
    }

    onEmailChange = event =>{
        event.preventDefault()
        this.setState({
            emailInput: event.target.value
        })
    }


    renderForm = () =>{
        if (this.state.loginForm) {
        return (
            <form onSubmit = {this.handleSignInSubmit}id="form">
                <i className="animated fas fa-user-plus fa-3x"></i>
                <h3 className="animated">Login</h3>
                {   this.props.signInError ?
                    <p style={{color: "red"}}>{"sign in error"}</p> : (null)
                }
                <input
                    type="Username"
                    placeholder="username"
                    value ={this.state.usernameInput}
                    onChange = {this.onUsernameChange}
                    >

                </input>
                <input
                    type="password"
                    placeholder="password"
                    value ={this.state.passwordInput}
                    onChange = {this.onPasswordChange}
                >
                </input>
                <button onClick = {this.handleSignInSubmit}className='signupbutton'>
                    Login
                </button>
            </form>
        )
        }
        else {
            return (
                <form onSubmit = {this.handleSignUpSubmit}id="form">
                    <i className="animated fas fa-user-plus fa-3x"></i>
                    <h3 className="animated">Sign Up</h3>
                    {   this.props.signUpError ?
                    <p style={{color: "red"}}>{"sign up error"}</p> : (null)
                }
                    <input
                        type="email"
                        placeholder="email"
                        value={this.state.emailInput}
                        onChange = {this.onEmailChange}
                    >
                    </input>
                    <input
                        type="Username"
                        placeholder="username"
                        value = {this.state.usernameInput}
                        onChange = {this.onUsernameChange}
                        >
                    </input>
                    <input
                        type="password"
                        placeholder="password"
                        value = {this.state.passwordInput}
                        onChange = {this.onPasswordChange}

                    >
                    </input>

                    <button onClick = {this.handleSignUpSubmit}className='signupbutton'>
                        Sign Up
                    </button>
                </form>
            )
        }
    }

    changeForm = ()=>{
        this.setState(prevState=>{
            return{
                loginForm: !prevState.loginForm
            }
        })
    }
    render(){


        return (
            <div className="homePage">
                <header>
                    <span id="logospan"><i class="animate fas fa-power-off fa-2x"></i><h2>rganizer</h2></span>
                    <span className="loginheader" >
                    <a href = "#form" onClick = {this.changeForm}>{log}</a>
                    </span>
                </header>
                <div className="maincontentlanding">
                    <div className="information">
                        <i class="fas fa-laptop fa-10x"></i>
                        <div className="icondiv">
                            <i className="far fa-calendar-alt fa-10x"></i>
                            <i className="far fa-clock fa-10x"></i>
                            <i className="fas fa-cloud-moon fa-10x"></i>
                            <i className="fas fa-book fa-10x"></i>
                        </div>
                        <div className="paragraphs"><p id ="p1">Simple, Intuitive Design.</p> <p id="p2">No complicated user interface to get used to. Simply all the
                            things you need in one place.</p> <p id ="p3">Schedule and document your days, week and month in a straightforward way with a
                            todoList, journal, calendar and event-reminder.</p> <p>Once you're logged in, click a day on the calendar to get started</p>
                        </div>

                    </div>
                    <div className="signup">
                        {this.renderForm()}
                    </div>
                </div>
            </div>

        )
    }
}

export default Landing