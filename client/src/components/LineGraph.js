import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineGraph = () => {
  const chartRef = useRef(null);
  const myLineChartRef = useRef(null);
  let myLineChart;

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    

    myLineChartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, -56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              borderWidth: (context) => {
                return context.tick.value === 0 ? 2 : 1;
              },
              borderColor: (context) => {
                return context.tick.value === 0 ? 'black' : 'rgba(0, 0, 0, 0.1)';
              },
              color: (context) => {
                return context.tick.value === 0 ? 'black' : 'rgba(0, 0, 0, 0.1)';
              },
            },
          },
        },
        onClick: (event, chartElement) => {
          if (chartElement[0]) {
            const index = chartElement[0].index;
            if (index === 2) {
              window.open('https://www.google.com', '_blank');
            }
          }
        },
      },
    });

    return () => {
      myLineChartRef.current.destroy();
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default LineGraph;
