import React from "react"

class DaysOfTheWeek extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dates: this.props.data.dates,
            todaysDate: new Date()
        }
    }

    render(){

        const dateList = this.props.data.dates.map(date=>{
            const yoyo = date;
            console.log(yoyo)
            if(date < 0){
                return(
                <span className="deaddate">{date}</span>
                )
            } else{
                let blahblah = new Date ()
                let todayy = blahblah.getDate()

                if (yoyo.props.children === todayy){
                    return(
                            <span style={{borderColor: "rgb(168, 66, 50)"}} className="dates">{date}</span>
                    )
                } else{
                    return(
                            <span className="dates">{date}</span>
                )
                }
            }
        });
        return (

                <div className="datecolumns">
                    <div className="dayoftheweek"><h4>{this.props.data.day}</h4></div>
                    <div className="individualdates">{dateList}</div>
                </div>

        )
    }

}








export default DaysOfTheWeek