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

const ProjectedGame = (game) => {
  
  const awayLogoLink = '/logos/' + game.awayTeam.abbreviation + '.svg';
  const homeLogoLink = '/logos/' + game.homeTeam.abbreviation + '.svg';

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

  return (
    <div className="card border-dark d-inline-flex scorecard" key={game.gameID}>
      <div className="card-body">
        <div className="row">
          <div className="col-3">
            <img className={"team-logo away " + game.awayTeam.abbreviation} src={awayLogoLink} loading="eager" alt={game.awayTeam.abbreviation}></img>
          </div>
          <div className="col-6">
            <p className="score-type h5toh4">Projected Score</p>
            <p className="score-num">{game.predScore.away.toFixed(1) + ' - ' + game.predScore.home.toFixed(1)}</p>
          </div>
          <div className="col-3">
          <img className={"team-logo home " + game.homeTeam.abbreviation} src={homeLogoLink} loading="eager" alt={game.homeTeam.abbreviation}></img>
          </div>
        </div>
        <div>
          <span className={"float-left spread line " + pickStyle}>{pickStr}</span>
          <span className={"float-right spread pick " + pickStyle}>{unitStr}</span></div>
      </div>
    </div>
  )
};

export default ProjectedGame;