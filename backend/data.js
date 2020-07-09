// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const gameSchema = new Schema(
  {
    gameID: Number,
    date: String,
    awayTeam: {
        id: Number,
        abbreviation: String,
    },
    homeTeam: {
        id: Number,
        abbreviation: String,
    },
    score: {
        away: Number,
        home: Number,
    },
    spread: Number,
    predScore: {
        away: Number,
        home: Number,
    }
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Game", gameSchema, 'games.2019-2020');