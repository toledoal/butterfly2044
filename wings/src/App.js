import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Balance from './components/balance';
import Home from './components/home';
import AppProvider from './components/AppProvider';

import Parallax from 'react-springy-parallax';


class App extends Component {

  state = {
      isFlipped: false,
  }

  constructor(props){
    super(props);
    
  }

  showBack = () => {
    this.setState({
      isFlipped: true
    });
  }



  showFront = () => {
    this.setState({
      isFlipped: false
    });
  }

  handleOnFlip = (flipped) => {
    if (flipped) {
      this.refs.backButton.getDOMNode().focus();
    }
  }

  handleKeyDown = (e) => {
    if (this.state.isFlipped && e.keyCode === 27) {
      this.showFront();
    }
  }


  render() {
    return (
    <AppProvider> 
      <Home/>
    </AppProvider>
    );
  }


  
}

export default App;
