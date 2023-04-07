import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useQuery, useMutation } from '@apollo/client';
import {GET_SEASON, GET_CURRENT_SEASON, GET_CURRENT_SEASONS} from '../utils/queries'
import 'chartjs-plugin-zoom';
import { chooseColor } from '../utils/chooseColor';
import 'bootstrap'

const LineGraph = () => {

  const chartRef = useRef(null);
  const myLineChartRef = useRef(null);
  const [labels, setLabels] = useState([]);
  const [dataSets, setDataSets] = useState([])
  const [borderWidth, setBorderWidth] = useState(5)
  const [dataMin, setDatamin] = useState(0)
  const [dataMax, setDataMax] = useState(0)
  const [numberOfLabels, setNumberOfLabels] = useState(0)
  const [graphWidth, setGraphWidth] = useState(800)
  const [graphHeight, setGraphHeight] = useState(600)
  const [teamNames, setTeamNames] = useState([])
  const handleNLWEST = () => {
    setTeamNames(['San Francisco Giants', 'Los Angeles Dodgers', 'San Diego Padres', `Arizona D'Backs`, `Colorado Rockies`])
  }
  const handleNLCENTRAL = () => {
    setTeamNames([`Chicago Cubs`, `St. Louis Cardinals`, `Cincinnati Reds`, `Pittsburgh Pirates`, `Milwaukee Brewers`])
  }

  const { loading, data } = useQuery(GET_CURRENT_SEASON, {
		variables: { 
      teamName: 'San Francisco Giants',
    },
		fetchPolicy: 'cache-and-network' //gets most updated data
	});

  const seasonData = data?.currentSeason || [];

  const {seasonsLoading, data: seasonsData} = useQuery(GET_CURRENT_SEASONS, {
    variables: {
      teamNames: teamNames
    },
    fetchPolicy: 'cache-and-network' //gets most updated data
  })
 
  const seasons = seasonsData?.currentSeasons || [];
  

  
  useEffect(() => {
    if (seasons[0]) {
      setLabels(seasons[0].labels);
      console.log(seasons)
      setBorderWidth(240/labels.length)
      let dataArr =[]
      let dataMinMax = []
      
      console.log('datamin', dataMin, 'datamax', dataMax)
      for(let i =0; i < seasons.length; i++){
        dataMinMax.push(Math.min(...seasons[i].standings), Math.max(...seasons[i].standings))
        dataArr.push(
          {
            label: seasons[i].teamName,
            data: seasons[i].standings,
            fill: false,
            borderColor: chooseColor(seasons[i].teamName),
            borderWidth: borderWidth,
            elements: {
              line: {
                borderWidth: 30
              }
            },
            pointRadius: 5, // hide the circles by default
            pointHoverRadius: 15, // set the radius of the circle on hover
            pointBackgroundColor: 'rgba(254, 90, 29, 0)',
            pointBorderColor: 'rgb(254, 90, 29, 0)', // desired point color,
            tension: 0,
          })
      }
      
      setDatamin(Math.min(...dataMinMax))
      setDataMax(Math.max(...dataMinMax))
      console.log(dataMinMax)
      setGraphHeight(Math.floor(graphWidth/(labels.length-1) * (dataMax-dataMin)))
      setNumberOfLabels(seasons[0].labels.length)
      console.log('datamin', dataMin, 'datamax', dataMax, 'number of labels', numberOfLabels)
      
      setDataSets(dataArr)
      
    }

  }, [seasons, dataMax, dataMin, graphHeight, setTeamNames]);

  useEffect(() => {
  
    setBorderWidth(300/labels.length)
    console.log(borderWidth)
    console.log(graphWidth)
    setGraphHeight(graphWidth/(labels.length -1) * (dataMax - dataMin))
    console.log(graphHeight)
    const ctx = chartRef.current.getContext('2d');
    const aspecRatio = graphWidth/graphHeight
    
    myLineChartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: dataSets,
      },
      options: {
        maintainAspectRatio: false, // Disable the default aspect ratio
        responsive: false,
        aspectRatio: aspecRatio, // Set a fixed aspect ratio of 1:1
        scales: {
          x:{
            type: 'linear',
            ticks: {
              fontSize: 24,
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
              autoSkip: false,
              fontSize: 24,
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
  }, [labels, graphHeight, teamNames]);
     

  return (
    <div className='container'>
      <h1>Select a division</h1>
      <button className='btn' onClick={handleNLWEST}>NL WEST</button>
      <button className='btn' onClick={handleNLCENTRAL}>NL CENTRAL</button>
      <canvas ref={chartRef} width={graphWidth}/>
    </div>
  )
};

export default LineGraph;
