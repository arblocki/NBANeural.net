import React from 'react';

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

const FutureGame = (game) => {
  
  const awayLogoLink = '/logos/' + game.awayTeam.abbreviation + '.svg';
  const homeLogoLink = '/logos/' + game.homeTeam.abbreviation + '.svg';

  const startTime = new Date(game.startTime)

  return (
    <div className="card border-dark d-inline-flex scorecard" key={game.gameID}>
      <div className="card-body">
        <div className="row">
          <div className="col-3">
            <img className={"team-logo away " + game.awayTeam.abbreviation} src={awayLogoLink} loading="eager" alt={game.awayTeam.abbreviation}></img>
          </div>
          <div className="col-6 proj-score">
            <center><p className="startTime">{startTime.toLocaleTimeString([], {timeStyle: 'short'})}</p></center>
            <p className="score-num">{game.awayTeam.abbreviation + ' - ' + game.homeTeam.abbreviation}</p>
          </div>
          <div className="col-3">
          <img className={"team-logo home " + game.homeTeam.abbreviation} src={homeLogoLink} loading="eager" alt={game.homeTeam.abbreviation}></img>
          </div>
        </div>
      </div>
    </div>
  )
};

export default FutureGame;