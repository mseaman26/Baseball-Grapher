const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Game{
        awayTeam: String
        awayScore: Int
        homeTeam: String
        homeScore: Int
        date: String
    }

    type Query{
       games (team: String): [Game] 
    }
`

module.exports = typeDefs