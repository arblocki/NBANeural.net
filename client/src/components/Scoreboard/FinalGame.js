import React from 'react';
import Logo from './Logo.js';

const formatNeutralPickStr = (game) => {
  const pickStr = (game.spread < 0) 
        ? game.homeTeam.abbreviation + ' ' + game.spread
        : game.awayTeam.abbreviation + ' -' + game.spread;
  return pickStr;
}

const formatActionPickStr = (game) => {
  var pickStr = '';
  if (game.spread < 0) {
    if (game.bet.team === game.homeTeam.abbreviation) {
      pickStr = game.homeTeam.abbreviation + ' ' + game.spread;
    } else {
      pickStr = game.awayTeam.abbreviation + ' +' + (-1 * game.spread);
    }
  } else {
    if (game.bet.team === game.homeTeam.abbreviation) {
      pickStr = game.homeTeam.abbreviation + ' +' + game.spread;
    } else {
      pickStr = game.awayTeam.abbreviation + ' -' + game.spread;
    }
  }
  return pickStr;
}

const FinalGame = (game) => {

  var pickStyle = '';
  var resultStr = '';
  var pickStr = '';

  if (game.bet.units === 0) {
    pickStyle = 'grey';
    resultStr = 'No Action';
    pickStr = (game.spread === 0) 
      ? 'PK' 
      : formatNeutralPickStr(game); 
  } else {
    pickStyle = (game.bet.status === 'PUSH') 
      ? 'grey'
      : (game.bet.status === 'WIN') 
        ? 'green'
        : 'red';
    resultStr = game.bet.units + ' Unit ' + game.bet.status;

    pickStr = (game.spread === 0)
      ? game.bet.team + ' PK'
      : formatActionPickStr(game);
  }

  return (
    <div className="card border-dark d-inline-flex scorecard" key={game.gameID}>
      <div className="card-body">
        <div className="row">
          <div className="col-3">
            {Logo(game.awayTeam.abbreviation, 'away')}
          </div>
          <div className="col-6">
            <p className="score-type h5toh4">Final Score</p>
            <p className="score-num">{game.score.away + ' - ' + game.score.home}</p>
          </div>
          <div className="col-3">
            {Logo(game.homeTeam.abbreviation, 'home')}
          </div>
        </div>
        <div className="row projected-row">
          <div className="col-3">
            <p className="h5toh4">{game.predScore.away.toFixed(1)}</p>
          </div>
          <div className="col-6">
            <h5 className="text-center proj-score">Projected Score</h5>
          </div>
          <div className="col-3">
            <p className="h5toh4">{game.predScore.home.toFixed(1)}</p>
          </div>
        </div>
        <div className="row">
          <div className="col"><span className={"float-left spread line " + pickStyle}>{pickStr}</span></div>
          <div className="col"><span className={"float-right spread pick " + pickStyle}>{resultStr}</span></div>
        </div>
      </div>
    </div>
  )
};

export default FinalGame;