import { gql } from '@apollo/client';

export const GET_SEASON = gql `
query Query($teamName: String!, $year: Int!) {
    season(teamName: $teamName, year: $year) {
      labels
      standings
      results
      games {
        awayTeam
        awayScore
        homeTeam
        homeScore
        date
        dayNumber
      }
    }
  }
`