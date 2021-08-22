import React , { useState, useEffect }from 'react';
import { Bar } from 'react-chartjs-2';


function VerticalBar ({ vaccinationDataChart}) {
  
  // console.log(vaccinationDataChart.data1Color);

  const data = {
    labels: vaccinationDataChart.districtLabels ,
    datasets: [
      {
        label: '% Citizens 18+ years received 1st Dose (Base: Estimated 18+ years population)',
        data: vaccinationDataChart.data1,
        backgroundColor: vaccinationDataChart.data1Color,
      },
      {
        label: '% Citizens 18+ years received 2nd Dose (Base: Estimated 18+ years population)',
        data: vaccinationDataChart.data2,
        backgroundColor: vaccinationDataChart.data2Color,
      }
    ],
  };
  
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Vaccination Coverage Status (All Categories)',
        color: '#000'
      },
       
 
      legend: {
        position: 'bottom',
        labels: {
          font: {
              size: 9
          }
        }
      }
    },
   

    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            weight: 'bolder',
            size: 10,
          }
        },
 
      }
    },
  };
  
  return(
    <>
      <Bar data={data} options={options} height={100} />
      <p className='vaccine-chart-subtitle'>*Data includes all categories (HCW/FLW/18-44years/45+ years)</p>

    </>
  )

};

export default VerticalBar