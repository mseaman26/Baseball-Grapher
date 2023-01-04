import React from 'react';

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
    console.log(e.clientX, e.clientY)
    if(e.clientX > startX && e.clientX < endX && e.clientY > startY && e.clientY < endY){
        console.log(true)
        context.beginPath();
        context.strokeStyle = "red";
        context.moveTo(50, 50);
        context.lineTo(100, 100);
        context.lineWidth = 10;
        context.stroke();
    }
});

// var canvas = document.getElementById("myCanvas"),
// ctx = canvas.getContext("2d"),
//     rects = [
//         {x: 10, y: 10, w: 200, h: 50},
//         {x: 50, y: 70, w: 150, h: 30}    // etc.
//     ], i = 0, r;

// // render initial rects.
// while(r = rects[i++]) ctx.rect(r.x, r.y, r.w, r.h);
// ctx.fillStyle = "blue"; ctx.fill();

// canvas.onmousemove = function(e) {

//   // important: correct mouse position:
// var rect = this.getBoundingClientRect(),
//       x = e.clientX - rect.left,
//       y = e.clientY - rect.top,
//       i = 0, r;
  
// ctx.clearRect(0, 0, canvas.width, canvas.height); // for demo
   
// while(r = rects[i++]) {
//     // add a single rect to path:
//     ctx.beginPath();
//     ctx.rect(r.x, r.y, r.w, r.h);    
    
//     // check if we hover it, fill red, if not fill it blue
//     ctx.fillStyle = ctx.isPointInPath(x, y) ? "red" : "blue";
//     ctx.fill();
//   }

// };
function App() {
  return <div>
    <h1>hello</h1>
  </div>
}

export default App;
