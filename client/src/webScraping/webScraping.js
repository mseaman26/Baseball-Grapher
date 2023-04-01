// const cheerio = require('cheerio')

const cheerio = require('cheerio')
const fetch = require('node-fetch')

const mlbURL = 'https://www.baseball-reference.com/leagues/majors/2022-schedule.shtml'

const scrapeGiantsGames = () =>{
    const giantsGames =[]

    fetch(mlbURL, )
    .then(response => response.text())
    .then(html => {
        var $ = cheerio.load(html)
            $('.game').each(function(i,element) {
            
                let game = $(element).text().replace(/\s\s+/g, '')
                let date = $(element).parent().find('h3').text()
                if(game.includes('San Francisco Giants')){
                    giantsGames.push([date, game])
                }           
            })
            console.log(giantsGames)
    })

            
        
    }
    scrapeGiantsGames()
    module.exports = {scrapeGiantsGames}





