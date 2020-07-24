import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Scoreboard from '../components/Scoreboard/Scoreboard.js';

import './scores.css';
import "react-datepicker/dist/react-datepicker.css";

const FutureDateAlert = () => {
  return (
    <div className="alert alert-dark" role="alert">
      Projections and spreads will be available on the day of the games.
    </div>
  );
}

class ScoresContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      games: [],
      date: new Date(),
    };

    // this.handlePrevDayClick = this.handlePrevDayClick.bind(this);
    // this.handleNextDayClick = this.handleNextDayClick.bind(this);
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
    (window.location.href.includes('localhost'))
    ? fetch('http://localhost:3001/api/getGames/' + dateStr)
      .then((data) => data.json())
      .then((res) => this.setState({ games: res.data, date: date }))
    : fetch('https://nbaneuralnet.herokuapp.com/api/getGames/' + dateStr)
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
        <div className="row" id="scores">
          <div className="col-7 col-md-10">
            <h2>Scores</h2>
          </div>
          <div className='col-5 col-md-2'>
            <DatePicker
              todayButton="Today"
              selected={this.state.date}
              onChange={date => this.getGames(date)}
              customInput={<ButtonDateInput />}
              popperModifiers={{
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false,
                  boundariesElement: "viewport",
                }
              }}
              showMonthDropdown
            />
          </div>
        </div>
        {this.state.games.length !== 0 && this.state.games[0].predScore.away === -1
          ? FutureDateAlert() : null}
        {this.state.games.length === 0
          ? <center><h4 className='no-games grey'>No games on this date!</h4></center>
          : <Scoreboard games={this.state.games}/>}
      </div>
    );
  }
}

export default ScoresContainer;