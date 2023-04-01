const {scrapeGiantsGames} = require('../webScraping/webScraping')

const resolvers = {
    Query: {
        games: async () => {
            const gamesData = scrapeGiantsGames()
            for(let i = 0; i < gamesData.length; i++){
                
            }
        }
    }
}
module.exports = resolvers