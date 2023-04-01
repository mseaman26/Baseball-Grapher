import React, {useRef, useEffect} from "react";
const cheerio = require('cheerio')
const fetch = require('node-fetch')
// import {scrapeGiantsGames} from '../webScraping/webScraping'

const Graph = () => {

  // scrapeGiantsGames()

  const canvasRef = useRef(null);

  useEffect(() => {
    const mlbURL = 'https://www.baseball-reference.com/leagues/majors/2022-schedule.shtml'
    const giantsGames =[]

    fetch(mlbURL, )
    .then(response => response.text())
    .then(html => {
        var $ = cheerio.load(html)
            $('.game').each(function(i,element) {
            
                let game = $(element).text().replace(/\s\s+/g, '')
                let date = $(element).parent().find('h3').text()
                if(game.includes('San Francisco Giants')){
                    giantsGames.push([date, game])
                }           
            })
            console.log(giantsGames)
    })

    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    console.log(canvas)
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    context.beginPath();
    context.strokeStyle = "red";
    context.moveTo(50, 50);
    context.lineTo(100, 100);
    var startX = 50
    var startY = 50
    var endX = 100
    var endY = 100
    
    context.strokeStyle = "blue";
    context.lineTo(150, 50)
    context.lineWidth = 10;
    
    context.stroke();
    
    document.addEventListener('mousemove', (e) => {
      var rect = canvas.getBoundingClientRect();
      let x = e.clientX - rect.left
      let y = e.clientY - rect.top
      if(x > startX && x < endX && y > startY && y < endY){
          context.beginPath();
          context.strokeStyle = "red";
          context.moveTo(50, 50);
          context.lineTo(100, 100);
          context.lineWidth = 10;
          context.stroke();
      }
    });
  })

    
    return(
      <canvas ref={canvasRef}>

      </canvas>
    )
}

export default Graph