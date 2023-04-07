const cheerio = require('cheerio')
const fetch = require('node-fetch')

const mlbURL = 'https://www.baseball-reference.com/leagues/majors/2023-schedule.shtml'

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

const scrapeCurrentSeason = async (teamName) => {
    try {
        const response = await fetch(mlbURL);
        const html = await response.text();
        const $ = cheerio.load(html);
        const games = [];
        const results = []
        const standings = [0]
        const labels = [0]

        $('.game').each(function (i, element) {
            let game = $(element).text().replace(/\s\s+/g, '');
            let date = $(element).parent().find('h3').text();
            if(game.includes(teamName)){
                console.log('teamname')
            }
            let month
            let day
            let dayNumber
            if(!date.includes('Today')){
                month = date.split(',')[1].split(' ')[1]
                //day number within month
                day = parseInt(date.split(',')[1].split(' ')[2])
                //numeric value for date
                dayNumber = day + numerateMonth(month)
            }else{
                dayNumber = games[games.length - 1].dayNumber + 1
            }
            
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
                if(game.includes('Preview')){
                    return false
                }

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
                //convert wins and losses into standings
                
                
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
        //convert results into standings
        let standing = 0
        let day = 0
                for(let i = 0; i < results.length; i++){
                    
                    switch (results[i]){
                        case 'win':
                            standing +=1
                            day += 1
                            standings.push(standing)
                            labels.push(day)
                            break
                        case 'loss':
                            standing -= 1
                            day += 1
                            standings.push(standing)
                            labels.push(day)
                            break
                        case 'winwin':
                            standing += 1
                            day += .5
                            standings.push(standing)
                            labels.push(day)
                            standing += 1
                            day += .5
                            standings.push(standing)
                            labels.push(day)
                            break
                        case 'winloss':
                            standing +=1
                            day += .5
                            standings.push(standing)
                            labels.push(day)
                            standing -= 1
                            day += .5
                            standings.push(standing)
                            labels.push(day)
                            break
                        case 'losswin':
                            standing -= 1
                            day += .5
                            standings.push(standing)
                            labels.push(day)
                            standing += 1
                            day += .5
                            standings.push(standing)
                            labels.push(day)
                            break
                        case 'lossloss':
                            standing -= 1
                            day += .5
                            standings.push(standing)
                            labels.push(day)
                            standing -= 1
                            day += .5
                            standings.push(standing)
                            labels.push(day)
                            break
                        case 'off':
                            day += 1
                            standings.push(standing)
                            labels.push(day)
                            break
                    }
                }

        return {
            teamName: teamName,
            labels: labels,
            standings: standings,
            games: games,
            results: results
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};
scrapeCurrentSeason('San Francisco Giants')
module.exports = { scrapeCurrentSeason };
