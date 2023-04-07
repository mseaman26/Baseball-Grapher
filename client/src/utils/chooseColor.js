const chooseColor = (teamName) => {
    switch(teamName){
        case 'San Francisco Giants':
            return 'rgb(254, 90, 29)'
        case 'Los Angeles Dodgers':
            return 'rgb(0, 104, 255)'
        case 'San Diego Padres':
            return 'rgb(153, 67, 8)'
        case `Arizona D'Backs`:
            return `rgb(214, 22, 45)`
        case `Colorado Rockies`:
            return `rgb(168, 11, 206)`
        case `Chicago Cubs`:
            return `rgb(9, 0, 198)`
        case `St. Louis Cardinals`:
            return `rgb(221, 114, 114)`
        case `Cincinnati Reds`:
            return `rgb(255,0,0)`
        case `Pittsburgh Pirates`:
            return `rgb(255, 195, 36)`
        case `Milwaukee Brewers`:
            return `rgb(178, 142, 66)`
        default:
            return 'rgb(254, 90, 29)'

    }
}

module.exports = {chooseColor}