const { Schema, model } = require('mongoose');

const gameSchema = new Schema ({
    awayTeam: {
        type: String
    },
    awayScore: {
        type: Number
    },
    homeTeam: {
        type: String
    },
    homeScore: {
        type: Number
    },
    date: {
        type: String
    }
})

const Game = model('Game', gameSchema)
module.exports = Game