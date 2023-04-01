const cheerio = require('cheerio')
const fetch = require('node-fetch')

const mlbURL = 'https://www.baseball-reference.com/leagues/majors/2022-schedule.shtml'

const scrapeGames = async (teamName) => {
    try {
        const response = await fetch(mlbURL);
        const html = await response.text();
        const $ = cheerio.load(html);
        const games = [];

        $('.game').each(function (i, element) {
            let game = $(element).text().replace(/\s\s+/g, '');
            let date = $(element).parent().find('h3').text();
            let away = game.split('@')[0];
            let home = game.split('@')[1];
            let awayTeam = away.split('(')[0];
            let homeTeam = home.split('(')[0];
            let awayScore = parseInt(away.split('(')[1]);
            let homeScore = parseInt(home.split('(')[1]);

            if (game.includes(teamName)) {
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

module.exports = { scrapeGames };
