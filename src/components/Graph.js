import React from "react";

const Graph = () => {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
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
      console.log(x, y)
      if(x > startX && x < endX && y > startY && y < endY){
          console.log(true)
          context.beginPath();
          context.strokeStyle = "red";
          context.moveTo(50, 50);
          context.lineTo(100, 100);
          context.lineWidth = 10;
          context.stroke();
      }
    });
}

export default Graph