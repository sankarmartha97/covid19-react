import React, { Component } from 'react'
import $ from 'jquery'
import Chart from 'chart.js'
export default class Chart2 extends Component {
    constructor(props){
        super(props);
        this.state ={

        }
    }
    //
    async componentDidMount(){
      var gate_name_array=[],suspected_array=[];
      var data_array=[];

      await fetch(`${process.env.REACT_APP_URL}/analysis/checkpoint`).then(
        res => res.json()
      ).then(chart2_data => this.setState({ chart2_data }, ()=>{
        data_array = [chart2_data[0].confirmed,chart2_data[0].negative,chart2_data[0].resultawaited]
//         negative: "49"
// samplecollected: "38"
// confirmed: "47"
// resultawaited: "17"
           for(var i=0;i<chart2_data.length;i++){
            gate_name_array.push(chart2_data[i].name);
            suspected_array.push(chart2_data[i].suspected);
    }
    
        
      }));
        var ctx = $('#myChart2');
        var visitorsData = {
            labels: ['+Ve','-Ve','Result Awaited'],
            datasets: [
                {
                    data: 
                    data_array,
                    // suspected_array,
                    // [100],
                    backgroundColor: [
                        "#da3300",
                        "#18ab6f",
                        "#ca6700"
                    ],
                    borderWidth: 0.5,
                }]
        };
        var myChart2 = new Chart(ctx, {
            type: 'pie',
            data: visitorsData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: true,
                align:'center',
                labels: {
                  fontColor: '#9db3b7',
                  fontSize:10
                }
              },
              
            }
        });
    }



  // render main component 
  render() {
    return (
      <div>
        <canvas id="myChart2" style={{height: '200px'}}></canvas>
      </div>
    )
  }
}
