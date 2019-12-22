import React from "react"
import "./CSSFiles/Landing.css"
import {Link} from "react-router-dom"



class Landing extends React.Component{

    render(){
        return (
            <div className="homePage">
                <header>
                    <span id="logospan"><i class="animate fas fa-power-off fa-2x"></i><h2>rganizer</h2></span>
                    <span className="loginheader" >
                          <Link to="/calendar">Login</Link>
                          <Link to="/contact">Contact</Link>
                    </span>
                </header>
                <div className="maincontentlanding">
                    <div className="information">
                        <h1>Welcome to the Organizer App </h1>
                        <p>Simple and Intuitive Design. That's the goal with this Organizer. <br/> <br/>No complicated User Interface to get used to. Simply all the
                            things you need in one place and in simple form. <br/><br/>Schedule and document your days, week and month in a straightforward way.
                            TodoList, journal, calendar and event-reminder all in one.
                        </p>
                        <i class="fas fa-laptop fa-10x"></i>
                        <div className="icondiv">
                            <i class="far fa-calendar-alt fa-10x"></i>
                            <i class="far fa-clock fa-10x"></i>
                            <i class="fas fa-cloud-moon fa-10x"></i>
                            <i class="fas fa-book fa-10x"></i>
                        </div>
                    </div>
                    <div className="signup animate">
                        <i className="animated fas fa-user-plus fa-3x"></i>
                        <h3 className="animated">Sign Up</h3>
                        <form>
                            <input
                                type="Username"
                                placeholder="username">
                            </input>

                            <input
                                type="password"
                                placeholder="password"
                            >
                            </input>
                            <button className='signupbutton'>
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default Landing