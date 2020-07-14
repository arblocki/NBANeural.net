import React from 'react';

const FinalGame = (game) => {
  
  const awayLogoLink = '/logos/' + game.awayTeam.abbreviation + '.svg';
  const homeLogoLink = '/logos/' + game.homeTeam.abbreviation + '.svg';

  const threshold = 5.5;
  const threshold_2u = 8;
  const threshold_3u = 10;

  const projectedSpread = game.predScore.away - game.predScore.home;
  const actualScoreDiff = game.score.away - game.score.home;
  var pickStr = '';
  var pickStyle = '';
  var pickResult = '';
  // Decide if a pick is being made
  if (Math.abs(projectedSpread - game.spread) > threshold) {  // If a pick is being made
    pickResult = '1 Unit ';

    // Determine how many units for the bet 
    if (Math.abs(projectedSpread - game.spread) > threshold_2u) {
      pickResult = '2 Unit ';
    }
    if (Math.abs(projectedSpread - game.spread) > threshold_3u) {
      pickResult = '3 Unit ';
    }

    // Determine if pick was correct 
    if (projectedSpread < game.spread && actualScoreDiff < game.spread) {
      pickStyle = 'green';
      pickResult += 'WIN';
    } else if (projectedSpread > game.spread && actualScoreDiff > game.spread) {
      pickStyle = 'green';
      pickResult += 'WIN';
    } else if (actualScoreDiff === game.spread) {
      pickStyle = 'grey';
      pickResult += 'PUSH';
    } else {
      pickStyle = 'red';
      pickResult += 'LOSS';
    }

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

  } else {
    pickStyle = 'grey';
    pickResult = 'No Action';
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
            <p className="score-type h5toh4">Final Score</p>
            <p className="score-num">{game.score.away + ' - ' + game.score.home}</p>
          </div>
          <div className="float-right image-container">
            <img className="team-logo" src={homeLogoLink} loading="eager" alt={game.homeTeam.abbreviation}></img>
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
          <div className="col"><span className={"float-right spread pick " + pickStyle}>{pickResult}</span></div>
        </div>
      </div>
    </div>
  )
};

export default FinalGame;