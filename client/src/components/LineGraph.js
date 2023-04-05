import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useQuery, useMutation } from '@apollo/client';
import {GET_SEASON, TEST_QUERY} from '../utils/queries'

const LineGraph = () => {

  const chartRef = useRef(null);
  const myLineChartRef = useRef(null);

  const { loading, data } = useQuery(GET_SEASON, {
		variables: { 
      teamName: 'San Francisco Giants',
      year: 2022
    },
		fetchPolicy: 'cache-and-network' //gets most updated data
	});

  const seasonData = data?.season || [];
  console.log(seasonData)

  const labels = seasonData.labels
  
  useEffect(() => {
    
   

    const ctx = chartRef.current.getContext('2d');
    
    myLineChartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'San Francisco Giants',
            data: seasonData.standings,
            fill: false,
            borderColor: 'rgb(254, 90, 29)',
            tension: 0,
          },
        ],
      },
      options: {
        maintainAspectRatio: false, // Disable the default aspect ratio
        aspectRatio: 1.333, // Set a fixed aspect ratio of 1:1
        scales: {
          x:{
            type: 'linear',
            ticks: {
              stepSize: 1,
              autoSkip: false,
              // callback: (value, index, values) => {
              //   if (index % 10 === 0) {
              //     return value;
              //   }
              //   return ''; // Return empty string for non-visible labels
              // }
              // callback: (value, index, values) => {
              //   if (value % 10 ===0) {
              //     return value;
              //   }
              // }
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
            ticks: {
              stepSize: 1,
              autoSkip: false
              // callback: (value, index, values) => {
              //   if (Number.isInteger(value)) {
              //     return value;
              //   }
              // }
            },
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
