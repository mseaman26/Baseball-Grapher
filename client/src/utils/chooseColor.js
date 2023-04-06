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
        default:
            return 'rgb(254, 90, 29)'

    }
}

module.exports = {chooseColor}