import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useQuery, useMutation } from '@apollo/client';
import {GET_SEASON} from '../utils/queries'

const LineGraph = () => {

  

  const chartRef = useRef(null);
  const myLineChartRef = useRef(null);

  const seasonData = useQuery(GET_SEASON)
  console.log(seasonData)

  const labels = [0,1,1.5,2,2.5,3]

  useEffect(() => {
    
    const ctx = chartRef.current.getContext('2d');
    
    myLineChartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 80, 81, -56, 55, 40],
            fill: false,
            borderColor: 'rgb(254, 90, 29)',
            tension: 0,
          },
        ],
      },
      options: {
        scales: {
          x:{
            type: 'linear',
            ticks: {
              stepSize: 1,
              callback: (value, index, values) => {
                if (Number.isInteger(value)) {
                  return value;
                }
              }
            },
            grid: {
              display: true,
              drawBorder: false,
              color: (context) => {
                return context.tick.value === 0 ? 'black' : 'rgba(0, 0, 0, 0.1)';
              },
              lineWidth: (context) => {
                return context.tick.value === 0 ? 2 : 1;
              },
              borderDash: (context) => {
                return context.tick.value === 0 ? [2] : [];
              },
            },
          },
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
