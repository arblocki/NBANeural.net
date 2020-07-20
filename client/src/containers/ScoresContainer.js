import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Scoreboard from '../components/Scoreboard/Scoreboard.js';

import './scores.css';
import "react-datepicker/dist/react-datepicker.css";

// const ButtonDateInput = ({ value, onClick }) => (
//   <button className="btn date-selector" onClick={onClick}>
//     {value}
//   </button>
// );


class ScoresContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      games: [],
      date: new Date(),
    };
  }

  componentDidMount() {
    this.getGames(this.state.date);
  }

  convertDate(date) {
    var dateStr = date.getFullYear().toString();
    var dateMonth = (date.getMonth() + 1).toString();
    (dateMonth.length === 1) 
      ? dateStr += ('0' + dateMonth)
      : dateStr += dateMonth
    var dateDay = date.getDate().toString();
    (dateDay.length === 1) 
      ? dateStr += ('0' + dateDay)
      : dateStr += dateDay

    return dateStr;
  }

  getGames(date) {
    var dateStr = this.convertDate(date);
    fetch('http://localhost:3001/api/getGames/' + dateStr)
        .then((data) => data.json())
        .then((res) => this.setState({ games: res.data, date: date }));
  }

  render() {
    const ButtonDateInput = ({ value, onClick }) => (
      <button className="btn date-selector" onClick={onClick}>
        {value}
      </button>
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-7 col-md-10">
            <h2>Scores</h2>
          </div>
          <div className='col-5 col-md-2'>
            <DatePicker
              todayButton="Today"
              selected={this.state.date}
              onChange={date => this.getGames(date)}
              customInput={<ButtonDateInput />}
            />
          </div>
        </div>
        {this.state.games.length === 0
            ? <center><h4 className='no-games grey'>No games on this date!</h4></center>
            : <Scoreboard games={this.state.games}/>}
      </div>
    );
  }
}

export default ScoresContainer;