// const cheerio = require('cheerio')

const cheerio = require('cheerio')
const fetch = require('node-fetch')

const mlbURL = 'https://www.baseball-reference.com/leagues/majors/2022-schedule.shtml'

const scrapeGiantsGames = (teamName) =>{

    fetch(mlbURL, )
    .then(response => response.text())
    .then(html => {
        var $ = cheerio.load(html)
        $('.game').each(function(i,element) {
        
            let game = $(element).text().replace(/\s\s+/g, '')
            let date = $(element).parent().find('h3').text()
            let away = game.split('@')[0]
            let home = game.split('@')[1]
            let awayTeam = away.split('(')[0]
            let homeTeam = home.split('(')[0]
            let awayScore = parseInt(away.split('(')[1])
            let homeScore = parseInt(home.split('(')[1])
            if(game.includes(teamName)){
                console.log(date, awayTeam, awayScore, homeTeam, homeScore)
            }           
        })
    })

            
        
    }
    scrapeGiantsGames('San Diego Padres')
    module.exports = {scrapeGiantsGames}





