
import React from 'react';
import { Line } from 'react-chartjs-2';
 

const rand = () => Math.abs(Math.random() * 20 - 10);

function LineChart({ covidDailyStatsChartDataFinal}){
  // console.log(covidDailyStatsChartDataFinal);
  const data = {
    labels: covidDailyStatsChartDataFinal.districtLabels,
    datasets: [
      {
        type: 'line',
        // lineTension: 0.5,
        label: 'Average Positivity Rate',
        borderColor: '#a0c636',
        backgroundColor: '#a0c636',
        borderWidth: 2,
        fill: false,
        data: covidDailyStatsChartDataFinal.positivityRate,

        },
      {
        type: 'bar',
        label: covidDailyStatsChartDataFinal.label1,
        backgroundColor: '#b8080b',
        yAxisID: 'B',
        data: covidDailyStatsChartDataFinal.data,
        // borderColor: 'white',
        // borderWidth: 2,
        usePointStyle : true,
        pointStyle : 'line',
      },
      {
        type: 'bar',
        label: covidDailyStatsChartDataFinal.label2,
        backgroundColor: '#5182bf',
        yAxisID: 'B',
        data: covidDailyStatsChartDataFinal.data2,
        // borderColor: 'white',
        // borderWidth: 2,
        usePointStyle : true,
        pointStyle : 'line',
      },
    ],
  };
  
  
  const options = {
    hover: {
      mode: 'index',
      intersect: true
   },
    elements: {
      point: {
        radius: 0
      }
    },
    plugins: {
      title: {
        display: true,  
        text: covidDailyStatsChartDataFinal.titleText,
        color: '#000'
      },
      legend: {
        labels: {
          // usePointStyle : true,
          // pointStyle: 'rect',
          // pointStyle :  function(item, chart) {
          //   // console.log(item.chart);
          //   if(item.chart){
          //     console.log(item.chart.legend.legendItems);
          //     if(item.chart.legend.legendItems)
          //     for (let index = 0; index < item.chart.legend.legendItems.length; index++) {
          //       // item.chart.legend.legendItems[index].text = 'red'
          //       console.log(index);
          //       if (index!==0) {
          //         console.log('line'); return 'line'
          //       }else{
          //         console.log('rect'); return 'rect'
          //       }
          //     }
          //   }            
          // },
          // pointStyle : 'line',
          filter: function(item, chart) {
            return item.datasetIndex !== covidDailyStatsChartDataFinal.INDEX_OF_DATASET && item.datasetIndex !== covidDailyStatsChartDataFinal.INDEX_OF_ANOTHER_DATASET;
          },

        }
      
      ,
        position: 'bottom',
        // display: true
      },
      tooltip: {
        mode: 'index', 
        // intersect: true
      },
    
    },
    responsive: true,
    maintainAspectRatio: false,
  
    scales: {
      
      x: {
        stacked: true,
        grid: {
          display: false
        },
        ticks: {
          font: {
            weight: 'bolder',
            size: 7.5,
          }
        }
      },
      y: {
        display: covidDailyStatsChartDataFinal.displayPerc,
        stacked: true,
        type: 'linear',
        position: 'right',
        grid: {
          display: false
        },
        ticks: {
          min: 0,
          max: 100,
          callback: function (value) {
            return value + "%"
          }
        }
      }
    },


  }
  
  return(
    <>
      <Line data={data} options={options} height={150} dot={false} />
    </>
  )
  };

export default LineChart;