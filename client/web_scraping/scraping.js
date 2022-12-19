const cheerio = require('cheerio')
const request = require('request')
const mlbURL = 'https://www.mlb.com/scores/2022-04-07'

request(mlbURL, function (err, res, html){
    if(!err && res.statusCode == 200){
        var $ = cheerio.load(html)
        var results = []
        $('div.ScoresGamestyle__PaddingWrapper-sc-7t80if-5').each(function(i,element) {
            var title = $(element).text()
            console.log(title)
        })
    }
})