const cheerio = require('cheerio')
const fetch = require('node-fetch')

const mlbURL = 'https://www.baseball-reference.com/leagues/majors/2022-schedule.shtml'

const numerateMonth = (month) => {
    switch (month) {
        case 'March':
            return 0
        case 'April':
            return 31
        case 'May':
            return 61
        case 'June':
            return 92
        case 'July':
            return 122
        case 'August':
            return 153
        case 'September':
            return 184
        case 'October':
            return 214
    }
}

const scrapeGames = async (teamName) => {
    try {
        const response = await fetch(mlbURL);
        const html = await response.text();
        const $ = cheerio.load(html);
        const games = [];
        const results = []

        $('.game').each(function (i, element) {
            let game = $(element).text().replace(/\s\s+/g, '');
            let date = $(element).parent().find('h3').text();
            let month = date.split(',')[1].split(' ')[1]
            //day number within month
            let day = parseInt(date.split(',')[1].split(' ')[2])
            //numeric value for date
            let dayNumber = day + numerateMonth(month)
            let away = game.split('@')[0];
            let home = game.split('@')[1];
            let awayTeam = away.split('(')[0];
            let homeTeam = home.split('(')[0];
            let awayScore = parseInt(away.split('(')[1]);
            let homeScore = parseInt(home.split('(')[1]);
            let teamScore
            let opponentScore
            //finding out who won
            if(homeTeam === teamName){
                teamScore = homeScore
                opponentScore = awayScore
            }else{
                teamScore = awayScore
                opponentScore = homeScore
            }
            
            if (game.includes(teamName)) {
                //check for off days
                if(games.length > 0 && dayNumber - games[games.length - 1].dayNumber > 1){
                    for(let i = 1; i < dayNumber - games[games.length - 1].dayNumber; i++){
                        results.push('off')
                    }
                }
                //check for double headers
                
                if(games.length > 0 && games[games.length - 1].date === date){
                    if(results[results.length - 1] === 'win'){
                        if(teamScore > opponentScore){
                            results.pop()
                            results.push('winwin')
                        }else{
                            results.pop()
                            results.push('winloss')
                        }
                    }else{
                        if(teamScore > opponentScore){
                            results.pop()
                            results.push('losswin')
                        }else{
                            results.pop()
                            results.push('lossloss')
                        }
                    }
                    //handle regular wins and losses
                }else{
                    if(teamScore > opponentScore){
                        results.push('win')
                    }
                    else{
                        results.push('loss')
                    }
                }
                
                games.push({
                    date: date,
                    awayTeam: awayTeam,
                    awayScore: awayScore,
                    homeTeam: homeTeam,
                    homeScore: homeScore,
                    dayNumber: dayNumber
                });
                
            }
        });
        console.log(results)
        return games;
    } catch (error) {
        console.log(error);
        return null;
    }
};
scrapeGames('San Francisco Giants')
module.exports = { scrapeGames };
