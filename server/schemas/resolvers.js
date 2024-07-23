const { scrapeGames } = require("../webScraping/webScraping")
const { scrapeCurrentSeason } = require ('../webScraping/currentSeaonScrape.js')
const {Game} = require ('../models')

const resolvers = {
    Query: {
        season: async (parent, args) => {
            try{
                const gamesData = await scrapeGames(args.teamName)
                return (gamesData)
            }catch(e){
                console.log(e)
            }
           
        },
        currentSeason: async (parent, args) => {
            try{
                const gamesData = await scrapeCurrentSeason(args.teamName)
                return (gamesData)
            }catch(e){
                console.log(e)
            }
           
        },
        currentSeasons: async (parent, args) => {
            console.log('Importing scrapeCurrentSeason:', scrapeCurrentSeason)
            console.log('args.teamNames:', args.teamNames)
            try{
                let seasons = []
                for(let i = 0; i < args.teamNames.length; i++){
                    const seasonData = await scrapeCurrentSeason(args.teamNames[i])
                    seasons.push(seasonData)
                }
                return seasons
            }catch(e){
                console.log(e)
            }
        },
        test: async (parent, args) => {
            try {
                const newString = args.testString
                return newString
            }catch(e){
                console.log(e)
            }
        }
    },
    Mutation: {
        addSeason: async (parent, args) => {
            const gameData = await scrapeGames(args.teamName)
            for(let i = 0; i < gameData.length; i++){
                Game.create({
                    awayTeam: gameData[i].awayTeam,
                    awayScore: gameData[i].awayScore,
                    homeTeam: gameData[i].homeTeam,
                    homeScore: gameData[i].homeScore,
                    date: gameData[i].date
                })
            }
        }
    }
}
module.exports = resolvers