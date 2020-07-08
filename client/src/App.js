import React, { Component } from 'react';
import Scoreboard from './components/Scoreboard/scoreboard.js';
// import axios from 'axios';
import { games } from './data';

class App extends Component {

  // state = {
  //   games: []
  // }

  // componentDidMount() {
  //   fetch('http://localhost:3001/api/getData')
  //     .then((res) => {
  //       res.json();
  //     })
  //     .then((data) => {
  //       this.setState({ games: data });
  //       console.log('Outputting projections for ' + data.length + ' games');
  //     })
  //     .catch(console.log);
  // }

  render () {
    return (
      <Scoreboard games={games}/>
    );
  }
}

export default App;
