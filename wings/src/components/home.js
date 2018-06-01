import React, { Component } from 'react';
import ParticlesConfig from '../../src/particles-config.json';
import Particles from 'react-particles-js';
import Loader from 'react-loader-spinner'
import Puzzles from '../components/puzzles';
import { AppContext } from './AppProvider';

class Home extends Component {

    constructor(props){
        super(props);
    }

    render(){

        const renderButtonsData = <AppContext.Consumer>
        {(context) => (
            <div className="username-control">
            <input type="text" placeholder="register new username" maxLength="16" onChange={context.handleChangeName} onKeyUp={context.setUserName} value={context.username}/>
            { context.isLoading && <div className="loader-home"> <Loader type="Puff" color="white" height={25} width={25}/></div>}
            <p className="subtitle address">{ context.currentAddress }</p>
            <p className="label">Current Address</p>
            <button onClick={context.setUserName}>ACCEPT THE CHALLENGE</button>
            </div>
          ) }
        </AppContext.Consumer>
        return(
            <AppContext.Consumer>
        {(context) => {
            if (context.logged){
                return <Puzzles/>
            } else {
               return (
                <div style={{height : "400px"}}>
                <div className="fixed">
                <h1 className="dapp-title">BUTTERFLY 4402</h1>
                 <p className="dapp-subtitle">Crypto Challenge your Friends!</p>
                 <p className="bullet">Challenge other users with questions</p>
                 <p className="bullet">If they can't answer on time they pay you</p>
                 <p className="bullet">if they do, you pay them!</p>
                 <p className="bullet">(Uses Rinkeby Network)</p>
                 </div>
                { renderButtonsData }
                  <Particles 
                      params={ParticlesConfig}
                      style={{
                        width: '100%',
                      }}
                  />
                <div>
                </div>
                </div>
               )

            }
           
        } }
        </AppContext.Consumer>
        );
    }

}  

export default Home;