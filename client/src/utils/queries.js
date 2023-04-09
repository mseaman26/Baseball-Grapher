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

export const GET_CURRENT_SEASON = gql`
query Query($teamName: String!) {
  currentSeason(teamName: $teamName) {
    standings
    labels
    games {
      awayTeam
      awayScore
      homeTeam
      homeScore
      date
      dayNumber
    }
    results
  }
}
`
export const GET_CURRENT_SEASONS = gql`
query Query($teamNames: [String!]) {
  currentSeasons(teamNames: $teamNames) {
    teamName
    labels
    standings
  }
}
`