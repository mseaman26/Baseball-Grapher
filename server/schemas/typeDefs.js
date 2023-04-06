const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Game{
        awayTeam: String
        awayScore: Int
        homeTeam: String
        homeScore: Int
        date: String
        dayNumber: Int
    }
    type Season{
        labels: [Float]
        standings: [Int]
        games: [Game]
        results: [String]
    }

    type Query{
       season(teamName: String!, year: Int!): Season 
       currentSeason(teamName: String!): Season
       results(teamName: String!, year: Int!): [String]
       test(testString: String!): String
    }

    type Mutation{
        addSeason(teamName: String!, year: Int!): [Game]
        addResults(teamName: String!, year: Int!): [String]
    }
`

module.exports = typeDefs