import React, { Component } from 'react';
import { AppContext } from './AppProvider';
import Balance from './balance';
import Card from './card';

import Popup from "reactjs-popup";
import { FlipCard } from 'react-flop-card';

class Puzzles extends Component {

    constructor(props){
        super(props);
    }

    render(){

        return(
            <AppContext.Consumer>
            {(context) => (
                <div className="main-wrapper">
                <div>
                <h1>BUTTERFLY 4402</h1>
                <p className="dapp-subtitle">Crypto Challenge your Friends!</p>
                <div className="sub-header">
                <p>Hello, <span>{context.username}</span></p> 

                {context.puzzleAccepted != "" ? <h2>A puzzle has been accepted by : {context.puzzleAccepted}</h2> : ""}
                {context.puzzleAssigned != "" ? <h2>A puzzle has been assigned to : {context.puzzleAssigned}</h2>: ""}
                
                <Balance/>

                <Popup trigger={<button>New</button>} position="right center" modal closeOnDocumentClick>
                 <div className="modal-challenge">
                    <h1>CHALLENGE WITH A QUESTION</h1>
                    <hr/>
                    <label>Challengee</label>
                    <select id="assignedTo" value={context.newQuestionData.assignedTo} onChange={context.handleFormChange}>
                      <option key="0" value="">Select one...</option>
                      {
                        context.players.map((player, i) => <option key={player} value={player}>{player}</option>)
                      }
                    </select>
                    <label>Question</label>
                    <input id="question" type="text" value={context.newQuestionData.question} onChange={context.handleFormChange} placeholder="Enter question (limit 32 chars)"/>
                    <label>Answer</label>
                    <input id="answer" type="text" value={context.newQuestionData.answer} onChange={context.handleFormChange} placeholder="Enter answer (limit 32 chars)"/>
                    <label>Will Pay (If solved on time)</label>
                    <input id="willPay" type="text" value={context.newQuestionData.willPay} onChange={context.handleFormChange} placeholder="WEI AMOUNT"/>
                    <label>Will Accept (If times out)</label>
                    <input id="willAccept" type="text" value={context.newQuestionData.willAccept} onChange={context.handleFormChange} placeholder="WEI AMOUNT"/>
                    <label>Time to Solve</label>
                    <select>
                    <option value="1">1 day</option>
                    </select>
                    <button onClick={context.createNewChallenge}>Send Challenge</button>
                 </div>
                 </Popup>
                
                </div>
                </div>
    
                <div className="questions-list">
                <span>Filter</span><select value={context.filteredBy} onChange={context.handleFilterChange}>
                <option value="all">All</option>
                <option value="0">Created</option>
                <option value="1">Assigned</option>
                <option value="2">Solved</option>
                <option value="3">Accepted</option>
                <option value="4">Rejected</option>
                <option value="5">TimedOut</option>
                </select>
                <div>
                {context.puzzles.map( puzzle => {

                  const statusCodes = ["Created", "Not yet accepted", "Solved", "Accepted", "Rejected", "Timed Out"];

                 const backChild = puzzle.status == 1 && puzzle.assignedTo == context.currentAddress ?  
                 <div className="puzzle-card">
                  <h3>Details of Puzzle {puzzle.id}</h3> 
                  <p>Question: {puzzle.question}</p>
                  <p>Assigned to: <span className="small-address"> {puzzle.assignedTo}</span></p>
                  <p>Status: {statusCodes[puzzle.status]}</p>
                  <p>Will Pay: {puzzle.willPay}</p> 
                  <p>Will Accept: {puzzle.willAccept}</p>
                   <button onClick={(e) => context.acceptAnswer(puzzle.id)}>Accept</button>
                 </div>   
                 :  <div className="puzzle-card">
                  <h3>Details of Puzzle {puzzle.id}</h3> 
                  <p>Question: {puzzle.question}</p>
                  <p>Assigned to: <span className="small-address"> {puzzle.assignedTo}</span></p>
                  <p>Status: {statusCodes[puzzle.status]}</p>
                  <p>Will Pay: {puzzle.willPay}</p> 
                  <p>Will Accept: {puzzle.willAccept}</p>
                  { puzzle.status == 3 ? <div><p>Enter your answer</p><input onClick={context.stopPropagation} value={context.answer} onChange={context.handleChangeAnswer} type="text"/><button onClick={(e) => context.submitAnswer(puzzle.id, e)}>Submit Answer</button></div> : "" }
                </div>;

                const frontChild = puzzle.status == 1 && puzzle.assignedTo == context.currentAddress ?  
                <div className="puzzle-card">
                  <h3>Puzzle {puzzle.id}</h3> 
                  <p>Question: {puzzle.question}</p>
                  <p>Status: {statusCodes[puzzle.status]}</p>
                </div>   
                :  <div className="puzzle-card">
                  <h3>Puzzle {puzzle.id}</h3> 
                  <p>Question: {puzzle.question}</p>
                  <p>Status: {statusCodes[puzzle.status]}</p>
                </div>;


                 return <FlipCard
                 key={ puzzle.id }
                 id={ puzzle.id}
                 flipped={ puzzle.isFlipped }
                 onClick={ (e) => puzzle.toggle(puzzle.id, e) }
                 frontChild= {  frontChild } 
                 backChild={  backChild  }
                 width={ 250 } height={ 250 }
                 style={ { front: frontStyle, back: backStyle, wrapper: wrapperStyle } }>
                 </FlipCard>
                 }
                )}
                </div>
                </div>
                </div>
              ) }
            </AppContext.Consumer>

        );
    }

}  

export default Puzzles;



const backStyle = {
    backgroundColor: 'white',
    borderRadius: '2px'
  };
  
  const frontStyle = {
    backgroundColor: 'white',
    borderRadius: '2px'
  };
   
  const letterStyle = {
    color: 'white',
    fontSize: '40px',
    margin: '28px 0',
    textAlign: 'center',
    fontFamily: 'sans-serif'
  };
   
  const containerStyle = {
    fontSize: 0,
    width: '632px',
    height: '300px',
    margin: '0 auto'
  };
   
  const wrapperStyle = {
    display: 'inline-block',
    margin: '2px'
  };