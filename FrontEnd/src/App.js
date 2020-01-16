import React from "react"
import MainContent from "./Components/MainContent"
import Loading from "./Loading.js"
import {getFromStorage, setInStorage} from './utils/storage'
import "./CSSFiles/Landing.css"

class App extends React.Component{
    constructor(props){
        super()
        this.state = {
            isLoading: true,
            token: '',
            signUpError: '',
            signInError: '',
            loginForm: true,
            usernameInput: '',
            emailInput: '',
            passwordInput: '',
            userId: ''
        }
}

handleSignUpSubmit = event =>{
    event.preventDefault()
    this.onSignUp(this.state.usernameInput, this.state.emailInput, this.state.passwordInput)
}

handleSignInSubmit = event =>{
    event.preventDefault()
    this.onSignIn(this.state.usernameInput, this.state.passwordInput)
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
            {   this.state.signInError ?
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
                {   this.state.signUpError ?
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

onSignUp= (usernamee, emaill, passwordd) =>{
    this.setState({
        isLoading: true
    })

    fetch('/api/account/signup', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            username: usernamee,
            email: emaill,
            password: passwordd
        })
    })
    .then(res=>res.json())
    .then(json => {
        if (json.success){
            console.log(json.userId)
            setInStorage('OrganizerApp', {token: json.token})
            this.setState({
                isLoading: false,
                token: json.token,
                usernameInput: '',
                emailInput: '',
                passwordInput: '',
                userId: json.userId
            })
        } else {
            this.setState({
                signUpError: json.message,
                isLoading: false
            })
        }
    })
    .catch(err=>{
        console.log(err)
    })
}

onSignIn = (usernamee, passwordd) =>{
    this.setState({
        isLoading: true
    })

    fetch('/api/account/signin', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            username: usernamee,
            password: passwordd
        })
    })
    .then(res=>res.json())
    .then(json => {
        if (json.success){
            console.log(json.userId)
            setInStorage('OrganizerApp', {token: json.token})
            this.setState({
                isLoading: false,
                token: json.token,
                usernameInput: '',
                emailInput: '',
                passwordInput: '',
                userId: json.userId
            })
        } else {
            console.log(json.message)
            this.setState({
                signInError: json.message,
                isLoading: false
            })
        }
    })
    .catch(err=>{
        this.setState({
            isLoading: false,
            signInError: "trouble logging in"
        })
        console.log(err)
    })
}

logout = () =>{
    this.setState({
        isLoading: true
    })

    const storageObj = getFromStorage('OrganizerApp')

    if (storageObj && storageObj.token){
        fetch('/api/account/logout?query=' + storageObj.token)
        .then(res=>res.json())
        .then(json =>{
            if (json.success){
                this.setState({
                    token: '',
                    isLoading: false
                })
            } else {
                console.log("errorrrr")
                this.setState({
                    isLoading: false,
                    token: ''
                })
            }
        })
        .catch()
    } else {
        this.setState({
            isLoading: false
        })
    }
}

componentDidMount(){
const storageObj = getFromStorage('OrganizerApp')

if (storageObj && storageObj.token){
    fetch('/api/account/verify?query=' + storageObj.token)
    .then(res=>res.json())
    .then(json =>{
        if (json.success){
            this.setState({
                token: storageObj.token,
                isLoading: false,
                userId: json.userId
            })
        } else {
            this.setState({
                isLoading: false
            })
        }
    })
    .catch()
} else {
    this.setState({
        isLoading: false
    })
}
}

render(){
    let log
    this.state.loginForm ? log = "Sign Up" : log = "Log In"

    if (this.state.isLoading){
        return (
            <Loading/>
        )
    }

    if (!this.state.token) {
        return (
            <div className="homePage">
            <header>
                <span id="logospan"><i className="animate fas fa-power-off fa-2x"></i><h2>rganizer</h2></span>
                <span className="loginheader" >
                <a href = "#form" onClick = {this.changeForm}>{log}</a>
                </span>
            </header>
            <div className="maincontentlanding">
                <div className="information">
                    <i className="fas fa-laptop fa-10x"></i>
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

    if (this.state.token){
        return (
            <MainContent userId = {this.state.userId} logout={this.logout}/>
        )
    }
    }
}


export default App