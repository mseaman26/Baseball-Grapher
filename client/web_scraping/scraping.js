const cheerio = require('cheerio')
const request = require('request')
const mlbURL = 'https://www.baseball-reference.com/leagues/majors/2022-schedule.shtml'

request(mlbURL, function (err, res, html){
    if(!err && res.statusCode == 200){
        var $ = cheerio.load(html)
        var results = []
        $('p.game').each(function(i,element) {
            if(i>10){
                return
            }
            var title = $(element).parent().text()
            title = title.split('Boxscore')
            title = title.join('')
            title = title.split('\n')
            title = title.filter((element) => element.length > 1)
           
            console.log(title)
        })
    }
})