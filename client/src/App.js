import React, { Component } from 'react';
import Scoreboard from './components/Scoreboard/ScoreBoard.js';
// import axios from 'axios';
//import { games } from './data';

class App extends Component {

  state = {
    dailyGames: [],
    seasonalGames: [],
  }

  componentDidMount() {
    this.getDailyGames('20200311');
  }

  getDailyGames(date) {
    (typeof date !== 'string' || date.length !== 8) ? console.error('Invalid date given to getDailyGames: ', date) : console.log('Fetching games for ', date);
    fetch('http://localhost:3001/api/getGames/' + date)
      .then((data) => data.json())
      .then((res) => this.setState({ dailyGames: res.data }));
  }

  getAllGames() {
    fetch('http://localhost:3001/api/getAllGames')
      .then((data) => data.json())
      .then((res) => this.setState({ seasonalGames: res.data }));
  }

  render () {
    return (
      <Scoreboard games={this.state.dailyGames}/>
    );
  }
}

export default App;
