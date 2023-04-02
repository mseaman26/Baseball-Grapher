import React, { useEffect, useRef } from 'react';
import paper from 'paper';

function Line() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Create a Paper.js canvas and attach it to the canvas element
    paper.setup(canvasRef.current);

    // Create a new path object and set its stroke color to red
    const path = new paper.Path({
      strokeColor: 'red',
      strokeWidth: 5,
    });

    // Set the path's starting point to (0, 0) and its ending point to (200, 200)
    path.moveTo(0, 0);
    path.lineTo(200, 200);

    // Tell Paper.js to draw the path
    paper.view.draw();

    // Clean up by removing the Paper.js canvas
    return () => {
      paper.remove();
    };
  }, []);

  return <canvas ref={canvasRef} />;
}

export default Line;
