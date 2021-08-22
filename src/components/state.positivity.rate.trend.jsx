
import React, {useEffect} from 'react';
import { Bar } from 'react-chartjs-2';

const rand = () => Math.abs(Math.random() * 50 - 10);



// const apiResponse = {
//     "message": "Successful",
//     "success": true,
//     "data": [
//       {
//         "date": "10 Jun 2021",
//         "confirmed": 1,
//         "tested": 1
//       },
//       {
//         "date": "11 Jun 2021",
//         "confirmed": 2,
//         "tested": 2
//       },
//       {
//         "date": "14 Jun 2021",
//         "confirmed": 1,
//         "tested": 1
//       },
//       {
//         "date": "16 Jun 2021",
//         "confirmed": 4,
//         "tested": 4
//       },
//       {
//         "date": "18 Jun 2021",
//         "confirmed": 1,
//         "tested": 1
//       },
//       {
//         "date": "19 Jun 2021",
//         "confirmed": 1,
//         "tested": 1
//       }
//     ]
//   };

//   const chart_data = (apiResponse.data);
//   var dateLabels = [], confirmed = [] , tested = [];

//   await fetch(`${process.env.REACT_APP_URL}/analysis/total`).then(
//     res => res.json()
//     ).then(chart_data => this.setState({ chart_data }, ()=>{
//        for(var i=0;i<chart_data.length;i++){
//             dateLabels.push(chart_data[i].date);
//             confirmed.push(chart_data[i].date);
//             tested.push(chart_data[i].quarantined);
//         }


// const data = {
//     labels:  dateLabels,
//     datasets: [
//         {
//             type: 'line',
//             label: 'Positivity Rate',
//             borderColor: '#aab587',
//             borderWidth: 2,
//             yAxisID: 'A',
//             fill: false,
//             data: [10,20,30,60,27,23,23,98,55,30,60,27,55,23,23,98,55,30,60,27,23,23,98,55],
//         },
//         {
//             type: 'bar',
//             label: 'Positive Cases',
//             backgroundColor: '#b8080b',
//             data: confirmed,
//             // borderColor: 'white',
//             // borderWidth: 2,
//         },
//         {
//             type: 'bar',
//             label: 'Total Tests',
//             backgroundColor: '#5182bf',
//             data: tested,
//             // borderColor: 'white',
//             // borderWidth: 2,
//         },
//     ],
// };


function StatePositiveTrend( {statePositivityTrend, dateLabel} ){
    // console.log(dateLabel);
    const options = {
        elements: {
            point: {
              radius: 0
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'State Positivity Rate Trend '+dateLabel,
                color: '#000'
            },
            legend: {
                position: 'bottom'
            }
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
                      size: 7,
                    },
                  }
            },
            y: {
                stacked: true,
                // id: 'B',
                type: 'linear',
                position: 'right',
                grid: {
                    display: false
                },
                ticks: {
                    min: 0,
                    max: 100,
                    callback: function(value) {
                        return value + "%"
                    }
                },
            }
           
        }
    }
    
    return (
    <>
        <Bar    data={statePositivityTrend} 
                options={options} 
                height={150} />
    </> 
    )
}

export default StatePositiveTrend;