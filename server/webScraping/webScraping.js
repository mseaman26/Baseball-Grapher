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
                console.log(dayNumber)
                games.push({
                    date: date,
                    awayTeam: awayTeam,
                    awayScore: awayScore,
                    homeTeam: homeTeam,
                    homeScore: homeScore
                });
            }
        });

        return games;
    } catch (error) {
        console.log(error);
        return null;
    }
};
scrapeGames('San Francisco Giants')
module.exports = { scrapeGames };
