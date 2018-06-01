import React, { Component } from 'react';

class Balance extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
               <p> Wins <span className="amount">0.25 ETH</span> </p>
               <p> Losses <span className="amount">0.25 ETH</span> </p>
            </div>
        );
    }

}  

export default Balance;