const cheerio = require('cheerio')
const request = require('request')
const mlbURL = 'https://www.baseball-reference.com/leagues/majors/2022-schedule.shtml'

request(mlbURL, function (err, res, html){
    if(!err && res.statusCode == 200){
        var $ = cheerio.load(html)
        var results = []
        $('.game').each(function(i,element) {
           
            let game = $(element).text().replace(/\s\s+/g, '')
            let date = $(element).parent().find('h3').text()
            if(game.includes('San Francisco Giants')){
                console.log(date, game)
            }
            
            // if(day.startsWith('Monday') ||day.startsWith('Tuesday') || day.startsWith('Wednesday') || day.startsWith('Thursday') || day.startsWith('Friday') || day.startsWith('Saturday') || day.startsWith('Sunday')){
            //     day = day.split('Boxscore')
            //     for(let i = 0; i < day.length; i++){
            //         console.log(day[0])
            //         // if(day[i].includes('San Francisco Giants')){
            //         //     let date = day[0].split('2022')[0]
            //         //     console.log(date, day[i])
            //         // }
            //     }
              
            // // }
            
            //     // .replace(/\s\s+/g, '').split('Boxscore')
            
        })
    }
})