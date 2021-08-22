import React, { Component, Fragment } from 'react'
import Chart from 'chart.js'
import $ from 'jquery'

export default class Chart1 extends Component {
  constructor(props){
    super(props);
    this.state ={
    }
  }
  //
  async componentDidMount(){
    var ctx = $("#myChart1");
    var screened_array =[],date_array=[],quarantined=[];

    // await fetch(`${process.env.REACT_APP_URL}/analysis/total`).then(
    //   res => res.json()
    //   ).then(chart_data => this.setState({ chart_data }, ()=>{
    //     for(var i=0;i<chart_data.length;i++){
    //   screened_array.push(chart_data[i].citizenscreened);
    //   date_array.push(chart_data[i].date);
    //   quarantined.push(chart_data[i].quarantined);
    //   }
  
  
    // }));
    var myChart1 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: 
         [
          '10/03/2020',
          '11/03/2020',
          '12/03/2020',
          '13/03/2020',
          '14/03/2020',
          '15/03/2020',
          '16/03/2020',
          '17/03/2020'
        ]
        
        ,
        datasets: [
          {
            label: 'Citizen Screened',
            data: 
            [100, 35, 85, 140, 48, 11, 44, 123, 55, 41],
            fill: false,
            borderColor: '#18ab6f',
            backgroundColor: '#18ab6f',
            borderWidth: 1
          },
          {
            label: 'Quarantined',
            // data: quarantined,
            // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            fill: false,
            borderColor: '#ffcd66',
            backgroundColor: '#ffcd66',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: '#9db3b7'
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: '#9db3b7',
                stepSize: 20,
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                fontColor: '#9db3b7',
                fontSize: 10,
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
  // main component
  render() {
    return (
      <Fragment>
        <div className="visitor_chart">
          <canvas id="myChart1"></canvas> 
        </div>
      </Fragment>
    )
  }
}
