const { scrapeGames } = require("../webScraping/webScraping")
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