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
       games (teamName: String!, year: Int!): [Game] 
       results(teamName: String!, year: Int!): [String]
    }

    type Mutation{
        addSeason(teamName: String!, year: Int!): [Game]
        addResults(teamName: String!, year: Int!)
    }
`

module.exports = typeDefs