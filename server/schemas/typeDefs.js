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
       games (teamName: String!): [Game] 
    }

    type Mutation{
        addSeason(teamName: String!, year: Int!): [Game]
    }
`

module.exports = typeDefs