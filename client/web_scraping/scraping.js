const cheerio = require('cheerio')
const request = require('request')
const mlbURL = 'https://www.baseball-reference.com/leagues/majors/2022-schedule.shtml'

request(mlbURL, function (err, res, html){
    if(!err && res.statusCode == 200){
        var $ = cheerio.load(html)
        var results = []
        $('p.game').each(function(i,element) {
            if(i > 0){
                return
            }
            const day = $(element).parent().text().replace(/\s\s+/g, '').split('Boxscore')
            console.log(day)
        })
    }
})