import React from 'react'
import './scoreboard.css';

const Scoreboard = ({ games }) => {
  return (
    <div>
      {games.map((game) => (
        <div className="card game" key={game._id}>
          <div className="card-body">
            <h5 className="card-title">{game.awayTeam.abbreviation + ' - ' + game.homeTeam.abbreviation}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{game.score.away + ' - ' + game.score.home}</h6>
            <center><p className="card-text">{
                game.spread === 0 
                    ? 'PK' 
                : game.spread < 0 
                    ? game.homeTeam.abbreviation + ' ' + game.spread 
                    : game.awayTeam.abbreviation + ' ' + (-1 * game.spread)
            }</p></center>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Scoreboard;