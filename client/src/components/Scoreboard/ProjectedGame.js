import React from 'react';

const ProjectedGame = (game) => {
  
  const awayLogoLink = '/logos/' + game.awayTeam.abbreviation + '.svg';
  const homeLogoLink = '/logos/' + game.homeTeam.abbreviation + '.svg';

  const threshold = 5.5;
  const threshold_2u = 8;
  const threshold_3u = 10;

  const projectedSpread = game.predScore.away - game.predScore.home;
  var pickStr = '';
  var pickStyle = '';
  var unitStr = '';
  // Decide if a pick is being made
  if (Math.abs(projectedSpread - game.spread) > threshold) {  // If a pick is being made
    pickStyle = 'green';
    unitStr = '1 Unit Pick';

    if (projectedSpread < game.spread) {  // If the home team is being picked
      if (game.spread < 0) {  // If the home team is favored
        pickStr = game.homeTeam.abbreviation + ' ' + game.spread;
      } else {
        pickStr = game.homeTeam.abbreviation + ' +' + game.spread;
      }
    } else {  // If the away team is being picked
      if (game.spread < 0) {  // If the home team is favored
        pickStr = game.awayTeam.abbreviation + ' +' + (-1 * game.spread);
      } else {
        pickStr = game.awayTeam.abbreviation + ' -' + game.spread;
      }
    }

    // Determine how many units for the bet 
    if (Math.abs(projectedSpread - game.spread) > threshold_2u) {
      unitStr = '2 Unit Pick';
    }
    if (Math.abs(projectedSpread - game.spread) > threshold_3u) {
      unitStr = '3 Unit Pick';
    }

  } else {
    pickStyle = 'grey';
    unitStr = 'No Action';
    if (game.spread < 0) {
      pickStr = game.homeTeam.abbreviation + ' ' + game.spread;
    } else {
      pickStr = game.awayTeam.abbreviation + ' -' + game.spread;
    }
  }

  return (
    <div className="card border-dark d-inline-flex scorecard">
      <div className="card-body">
        <div className="score">
          <div className="float-left image-container">
            <img className="team-logo" src={awayLogoLink} loading="eager" alt={game.awayTeam.abbreviation}></img>
          </div>
          <div className="d-inline-block score-info">
            <p className="score-type h5toh4">Projected Score</p>
            <p className="score-num">{game.predScore.away.toFixed(1) + ' - ' + game.predScore.home.toFixed(1)}</p>
          </div>
          <div className="float-right image-container">
            <img className="team-logo" src={homeLogoLink} loading="eager" alt={game.homeTeam.abbreviation}></img>
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