import React from "react"


class DeadDate extends React.Component{
    constructor(){
        super()
        this.state={
            hasDate: true

        }
    }



    render(){
        return(
            <div className="deaddate"></div>
        )
    }
}


export default DeadDate