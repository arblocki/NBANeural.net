import React from 'react';
import Logo from './Logo.js';

const formatNeutralPickStr = (game) => {
  var pickStr = (game.spread < 0) 
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

const ProjectedGame = (game) => {

  var pickStyle = '';
  var unitStr = '';
  var pickStr = '';

  if (game.bet.units === 0) {
    pickStyle = 'grey';
    unitStr = 'No Action';
    pickStr = (game.spread === 0) 
      ? 'PK' 
      : formatNeutralPickStr(game); 
  } else {
    pickStyle = 'green';
    unitStr = game.bet.units + ' Unit Pick';
    pickStr = (game.spread === 0) 
      ? game.bet.team + ' PK'
      : formatActionPickStr(game);
  }

  const startTime = new Date(game.startTime)

  return (
    <div className="card border-dark d-inline-flex scorecard" key={game.gameID}>
      <div className="card-body">
        <div className="row">
          <div className="col-3">
            {Logo(game.awayTeam.abbreviation, 'away')}
          </div>
          <div className="col-6 proj-score">
            <center><p className="startTime">{startTime.toLocaleTimeString([], {timeStyle: 'short'})}</p></center>
            <p className="score-type h5toh4">Projected Score</p>
            <p className="score-num">{game.predScore.away.toFixed(1) + ' - ' + game.predScore.home.toFixed(1)}</p>
          </div>
          <div className="col-3">
            {Logo(game.homeTeam.abbreviation, 'home')}
          </div>
        </div>
        <div>
          <span className={"float-left spread line " + pickStyle}>{pickStr}</span>
          <span className={"float-right spread pick " + pickStyle}>{unitStr}</span>
        </div>
      </div>
    </div>
  )
};

export default ProjectedGame;