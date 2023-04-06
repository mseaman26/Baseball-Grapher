import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useQuery, useMutation } from '@apollo/client';
import {GET_SEASON, GET_CURRENT_SEASON, GET_CURRENT_SEASONS} from '../utils/queries'
import 'chartjs-plugin-zoom';

const LineGraph = () => {

  const chartRef = useRef(null);
  const myLineChartRef = useRef(null);
  const [labels, setLabels] = useState([]);

  const { loading, data } = useQuery(GET_CURRENT_SEASON, {
		variables: { 
      teamName: 'San Francisco Giants',
    },
		fetchPolicy: 'cache-and-network' //gets most updated data
	});

  const seasonData = data?.currentSeason || [];

  const {seasonsLoading, data: seasonsData} = useQuery(GET_CURRENT_SEASONS, {
    variables: {
      teamNames: ['San Francisco Giants', 'Los Angeles Dodgers']
    },
    fetchPolicy: 'cache-and-network' //gets most updated data
  })
 
  const seasons = seasonsData?.currentSeasons || [];
  

  
  useEffect(() => {
    if (seasons[0]) {
      setLabels(seasons[0].labels);
    }
  }, [seasons]);

  useEffect(() => {
    try{
      console.log(seasons[0].labels)
    }catch(e){

    }
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
            borderWidth: 7,
            pointRadius: 5, // hide the circles by default
            pointHoverRadius: 15, // set the radius of the circle on hover
            pointBackgroundColor: 'rgba(254, 90, 29, 0.1)',
            pointBorderColor: 'rgb(254, 90, 29, 0)', // desired point color,
            tension: 0,
          },
        ],
      },
      options: {
        maintainAspectRatio: false, // Disable the default aspect ratio
        responsive: false,
        aspectRatio: 1, // Set a fixed aspect ratio of 1:1
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
        plugins: {
    zoom: {
      zoom: {
        wheel: {
          enabled: true, // enable zooming with the mouse wheel
        },
        pinch: {
          enabled: true, // enable zooming with pinch gestures
        },
        mode: 'xy', // allow zooming on both the x and y axis
      },
      pan: {
        enabled: true, // enable panning of the chart
        mode: 'xy', // allow panning on both the x and y axis
      },
    },
  }
      },
    });
    
    return () => {
      myLineChartRef.current.destroy();
    };
  }, [labels]);
     
  
  return (
      <canvas ref={chartRef}/>
    
  )
};

export default LineGraph;
