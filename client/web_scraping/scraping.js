const cheerio = require('cheerio')
const request = require('request')
const mlbURL = 'https://www.baseball-reference.com/leagues/majors/2022-schedule.shtml'

request(mlbURL, function (err, res, html){
    if(!err && res.statusCode == 200){
        var $ = cheerio.load(html)
        var re
        sults = []
        $('div').each(function(i,element) {
            // if(i > 50){
            //     return
            // }
            let day = $(element).text().replace(/\s\s+/g, '')
            if(day.startsWith('Monday') ||day.startsWith('Tuesday') || day.startsWith('Wednesday') || day.startsWith('Thursday') || day.startsWith('Friday') || day.startsWith('Saturday') || day.startsWith('Sunday')){
                day = day.split('Boxscore')
                if(day.length < 20){
                    console.log(day[0])
                }
                
            }
            
                // .replace(/\s\s+/g, '').split('Boxscore')
            
        })
    }
})