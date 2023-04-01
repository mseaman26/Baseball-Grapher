import { Schema, model } from 'mongoose';

const gameSchema = newSchemaa ({
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