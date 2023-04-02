import React, { useEffect, useRef } from 'react';
import { select } from 'd3-selection';
import { zoom, ZoomTransform } from 'd3-zoom';

const Line = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = select(svgRef.current);
    const width = svg.attr('width');
    const height = svg.attr('height');

    // Define the zoom behavior
    const zoomBehavior = zoom()
      .scaleExtent([1, 10]) // Limit zoom to a minimum and maximum scale
      .on('zoom', (event) => {
        // Update the line and box position and size based on the zoom transform
        g.attr('transform', event.transform);
      });

    // Create the box
    const box = svg.append('rect')
      .attr('x', 50)
      .attr('y', 50)
      .attr('width', 200)
      .attr('height', 100)
      .attr('stroke', 'black')
      .attr('fill', 'none');

    // Create the line
    const line = svg.append('line')
      .attr('x1', 60)
      .attr('y1', 80)
      .attr('x2', 240)
      .attr('y2', 80)
      .attr('stroke', 'red')
      .attr('stroke-width', 2);

    // Create the circle
    const circle = svg.append('circle')
      .attr('cx', 150)
      .attr('cy', 80)
      .attr('r', 6)
      .attr('fill', 'black')
      .style('cursor', 'pointer')
      .on('click', () => {
        window.open('https://www.google.com', '_blank');
      });

    // Create the group element to hold the line, box, and circle
    const g = svg.append('g');

    // Add the zoom behavior to the group element
    g.call(zoomBehavior);

    // Set the initial zoom transform
    svg.call(zoomBehavior.transform, new ZoomTransform(svg.node()));
  }, []);

  return (
    <svg ref={svgRef} width={300} height={200} />
  );
};

export default Line;
