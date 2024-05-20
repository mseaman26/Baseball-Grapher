import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_SEASON,
  GET_CURRENT_SEASON,
  GET_CURRENT_SEASONS,
} from "../utils/queries";
import "chartjs-plugin-zoom";
import { chooseColor } from "../utils/chooseColor";
import "../App.css";
import {monthStartIndexes}from '../utils/helpers'

const LineGraph = () => {
  const chartRef = useRef(null);
  const myLineChartRef = useRef(null);
  const containerRef = useRef(null);
  const [labels, setLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);
  const [borderWidth, setBorderWidth] = useState(null);
  const [dataMin, setDatamin] = useState(0);
  const [dataMax, setDataMax] = useState(0);
  const [numberOfLabels, setNumberOfLabels] = useState(0);
  const [graphWidth, setGraphWidth] = useState(1000);
  const [graphHeight, setGraphHeight] = useState(600);
  const [teamNames, setTeamNames] = useState([]);
  const [graphDisplay, setGraphDisplay] = useState('hidden')
  const reRender = () => {

  }
  const divider = 180 //raise this to lower wine width of the graphs

  const handleNLWEST = () => {
    setTeamNames([
      "San Francisco Giants",
      "Los Angeles Dodgers",
      "San Diego Padres",
      `Arizona D'Backs`,
      `Colorado Rockies`,
    ]);
  };
  const handleNLCENTRAL = () => {
    setTeamNames([
      `Chicago Cubs`,
      `St. Louis Cardinals`,
      `Cincinnati Reds`,
      `Pittsburgh Pirates`,
      `Milwaukee Brewers`,
    ]);
  };
  const handleNLEAST = () => {
    setTeamNames([
      `Atlanta Braves`,
      `New York Mets`,
      `Philadelphia Phillies`,
      `Washington Nationals`,
      `Miami Marlins`,
    ]);
  };
  const handleALWEST = () => {
    setTeamNames([
      `Oakland Athletics`,
      `Los Angeles Angels`,
      `Texas Rangers`,
      `Seattle Mariners`,
      `Houston Astros`,
    ]);
  };
  const handleALCENTRAL = () => {
    setTeamNames([
      `Detroit Tigers`,
      `Kansas City Royals`,
      `Chicago White Sox`,
      `Cleveland Guardians`,
      `Minnesota Twins`,
    ]);
  };
  const handleALEAST = () => {
    setTeamNames([
      `New York Yankees`,
      `Boston Red Sox`,
      `Baltimore Orioles`,
      `Toronto Blue Jays`,
      `Tampa Bay Rays`,
    ]);
  };

  const { loading, data } = useQuery(GET_CURRENT_SEASONS, {
    variables: {
      teamNames: teamNames,
    },
    fetchPolicy: "cache-and-network", //gets most updated data
  });

  const seasons = data?.currentSeasons || [];
  console.log(data)

  useEffect(() => {
    
    if (seasons[0]) {
      let labelMax = 0;
      let max = 0;
      for (let i = 0; i < seasons.length; i++) {
        if (seasons[i].labels.length > max) {
          max = seasons[i].labels.length;
          setLabels(seasons[i].labels);
        }
      }

      //setBorderWidth(500000 /window.innerWidth/ labels.length);
      // setBorderWidth(20);
      console.log(borderWidth)
      let dataArr = [];
      let dataMinMax = [];

      for (let i = 0; i < seasons.length; i++) {
        dataMinMax.push(
          Math.min(...seasons[i].standings),
          Math.max(...seasons[i].standings)
        );
        dataArr.push({
          label: seasons[i].teamName,
          data: seasons[i].standings,
          fill: false,
          borderColor: chooseColor(seasons[i].teamName),
          borderWidth: borderWidth,
          elements: {
            line: {
              borderWidth: borderWidth,
            },
          },
          pointRadius: 5, // hide the circles by default
          pointHoverRadius: 15, // set the radius of the circle on hover
          pointBackgroundColor: "rgba(254, 90, 29, 0)",
          pointBorderColor: "rgb(254, 90, 29, 0)", // desired point color,
          tension: 0,
        });
      }

      setDatamin(Math.min(...dataMinMax));
      setDataMax(Math.max(...dataMinMax));
      setGraphHeight(
        Math.floor((graphWidth / (labels.length - 1)) * (dataMax - dataMin))
      );
      setNumberOfLabels(seasons[0].labels.length);

      setDataSets(dataArr);
      
    }
  }, [seasons, dataMax, dataMin, graphHeight, borderWidth]);

  useEffect(() => {
    
    setGraphHeight((graphWidth / (labels.length - 1)) * (dataMax - dataMin));
    let aspecheight = dataMax - dataMin +1;
    let aspecWidth = (labels.length -3)/2;
    
    console.log(dataMax, dataMin, aspecheight, aspecWidth)

    const ctx = chartRef.current.getContext("2d");
    let aspecRatio = aspecWidth / aspecheight;
    myLineChartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: dataSets,
      },
      options: {
        // onResize: () => {
        //   console.log('resize', window.innerWidth)
        //   setBorderWidth(window.innerWidth/70)
        // },
        maintainAspectRatio: true, // Disable the default aspect ratio
        responsive: true,
        aspectRatio: aspecRatio, // Set a fixed aspect ratio of 1:1
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
            type: "linear",
            ticks: {
              fontSize: 48,
              stepSize: 1,
              autoSkip: false,
              callback: function(value, index, values) {
                // Only show labels for every 5th tick and account for change of month
                console.log(dataSets.length)
                // if(index === 1){
                //   return 'March'
                // }
                if(index === 0){
                  return 'March'
                }
                if(index < 11 && index > 0 && index%5 === 0 && index < 10){
                  return index + 20
                }
                if(index === 11){
                  return 'April'
                }
                if(index > 11 && index < 41 && (index - 11)%5 === 0 && (index-11) < 30){

                  return index-11
                }
                
                if(index === 41){
                  return 'May'
                }
                
                if(index > 41 && index < 72 && (index - 41)%5 === 0 && (index-41) < 30){
                  return index - 41
                }else{
     
                }
                if(index === 72){
                  return 'June'
                }
                if(index > 72 && index < 102 && (index - 72)%5 === 0 && (index-72) < 30){
                  return index - 72
                }
                if(index === 102){
                  return 'July'
                }
                if(index > 102 && index < 133 && (index - 102)%5 === 0 && (index-102) < 30){
                  return index - 102
                }
                if(index === 133){
                  return 'August'
                }
                if(index > 133 && index < 163 && (index - 133)%5 === 0 && (index-133) < 30){
                  return index - 133
                }
                if(index === 163){
                  return 'September'
                }

               

                if (labels[index]) {
                  return labels[index] * 2;
                }
              }
            },
            grid: {
              display: true,
              drawBorder: false,
              color: (context) => {
                return monthStartIndexes.includes(context.tick.value)
                  ? "black"
                  : "rgba(0, 0, 0, 0.1)";
              },
              // lineWidth: (context) => {
              //   return monthStartIndexes.includes(context.tick.value) ? 5 : 1;
              // },
              borderDash: (context) => {
                return context.tick.value === 0 ? [2] : [];
              },
            },
          },
          y: {
            title:{
              display: true,
              text: 'Games above/below .500',
              
            },
            ticks: {
              stepSize: 1,
              autoSkip: false,
              fontSize: 24,
              callback: function(value, index, values) {
                // Only show labels for every 5th tick
                if (value % 5 === 0) {
                    return value;
                }
                return '';
              }
            },
            beginAtZero: true,
            grid: {
              lineWidth: (context) => {
                return context.tick.value === 0 ? 5 : 1;
              },
              borderColor: (context) => {
                return context.tick.value === 0
                  ? "black"
                  : "rgba(0, 0, 0, 0.1)";
              },
              //make every 5th level in the standings bolder
              color: (context) => {
                return context.tick.value%5 === 0
                  ? "black"
                  : "rgba(0, 0, 0, 0.1)";
              },
            },
            
          },
          
        },
        onClick: (event, chartElement) => {
          if (chartElement[0]) {
            const index = chartElement[0].index;
            if (index === 2) {
              window.open("https://www.google.com", "_blank");
            }
          }
        },
        plugins: {
          legend: false,
          zoom: {
            zoom: {
              wheel: {
                enabled: true, // enable zooming with the mouse wheel
              },
              pinch: {
                enabled: true, // enable zooming with pinch gestures
              },
              mode: "xy", // allow zooming on both the x and y axis
            },
            pan: {
              enabled: true, // enable panning of the chart
              mode: "xy", // allow panning on both the x and y axis
            },
          },
        },
      },
    });
    if(seasons[0]){
      setGraphDisplay('visible')
    }

    return () => {
      myLineChartRef.current.destroy();
    };
  }, [labels, borderWidth, dataSets, dataMax, dataMin, graphWidth, graphHeight]);

  useEffect(() => {
    setBorderWidth(Math.floor(window.innerWidth/divider))
    const handlResize = () => {
      console.log('window width: ', window.innerWidth)
      console.log('border width: ', Math.floor(window.innerWidth/divider))
      setBorderWidth(Math.floor(window.innerWidth/divider))
    }
    window.addEventListener('resize', handlResize)
    window.addEventListener('orientationchange', handlResize)
    return () => {
      window.removeEventListener('resize', handlResize)
    }
  }, [])

  return (
    <div className="container col-3-lg" ref={containerRef}>
      <h1>Select MLB division</h1>
      <div className="row">
        <div className="col-4 col-lg-2 p-1"><button className="btn btn-primary" onClick={handleNLWEST}>
          NL WEST
        </button></div>
        <div className="col-4 col-lg-2 p-1"><button className="btn btn-primary" onClick={handleNLCENTRAL}>
          NL CENTRAL
        </button></div>
        <div className="col-4 col-lg-2 p-1"><button className="btn btn-primary" onClick={handleNLEAST}>
          NL EAST
        </button></div>
        <div className="col-4 col-lg-2 p-1"><button className="btn btn-primary" onClick={handleALWEST}>
          AL WEST
        </button></div>
        <div className="col-4 col-lg-2 p-1"><button className="btn btn-primary" onClick={handleALCENTRAL}>
          AL CENTRAL
        </button></div>
        <div className="col-4 col-lg-2 p-1"><button className="btn btn-primary" onClick={handleALEAST}>
          AL EAST
        </button></div>
      </div>
      {loading ? (
        <></>
      ) : (
        <div className="row" style={{'margin': '10px'}}>
          {seasons.map((season) => (
            <div className="col-2" style={{'margin': '5px'}}>
            <div style={{'background-color': chooseColor(season.teamName), 'height': borderWidth}}></div>
            <div className="col-2" style={{'font-size': 12}}>{season.teamName}</div>
            </div>
          ))}
        </div>
      )}
      {loading ? (
        <>loading</>
      ) : (
        <></>
      )}
      
      <canvas
          ref={chartRef}
          className="chart_canvas"
          style={{ width: "100%", visibility: graphDisplay }}
        />
    </div>
  );
};

export default LineGraph;
