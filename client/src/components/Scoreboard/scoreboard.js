import React from 'react';
import './scoreboard.css';
import ProjectedGame from './ProjectedGame.js';
import FinalGame from './FinalGame.js';

const Scoreboard = ({ games }) => {
  // console.log(games)
  return (
    <div class="container" id="scoreboard">
      <div class="row">
        <div class="col">
          <h2>Scores</h2>
          {games.map((game) => (
            (game.score.away === -1 && game.score.home === -1)
              ? ProjectedGame(game)
              : FinalGame(game)
          ))}
        </div>
      </div>
    </div>
  )
};

export default Scoreboard;