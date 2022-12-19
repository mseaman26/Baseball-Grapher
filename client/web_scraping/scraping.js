const cheerio = require('cheerio')
const request = require('request')
const mlbURL = 'https://www.mlb.com/scores/2022-04-01'

request(mlbURL, function (err, res, html){
    if(!err && res.statusCode == 200){
        
    }
})