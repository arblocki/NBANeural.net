import React from 'react';
import ProjectedGame from './ProjectedGame.js';
import FinalGame from './FinalGame.js';

const Scoreboard = ({ games }) => {
  
  return (
    <div className="row">
      <div className="col">
        {games.map((game) => (
          (game.score.away === -1 && game.score.home === -1)
            ? ProjectedGame(game)
            : FinalGame(game)
        ))}
      </div>
    </div>
  )
};

export default Scoreboard;
