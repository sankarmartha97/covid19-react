import React, { Fragment, useState, useEffect } from 'react';

const DashboardOptions = () => {

  // state vaiable
  const [totalReport, setTotalReport] = useState([]);
  const [totalCitizenReport, setTotalCitizenReport] = useState([]);


  // function defination
  async function fetchCitizenData() {
    // await fetch(`${process.env.REACT_APP_URL}/status/report`)
    //   .then(res => res.json())
    //   .then(data => setTotalReport(data))
    //   .catch(err => console.log(err));
  }
  // 
  // async function fetchRestCitizenData() {
  //   await fetch('http://localhost:4000/visitors/citizenscreened')
  //     .then(res => res.json())
  //     .then(data => setTotalCitizenReport(data))
  //     .catch(err => console.log(err));
  // }

  // 
  useEffect(() => {
    fetchCitizenData();
    // fetchRestCitizenData();
  }, [])



  // render main component
  return (
    <Fragment>
      <div className='state_report_title'>
        <p>STATE REPORT</p>
      </div>
      <div className='dashboard_option_wrapper'>
        {totalReport.map((data, index) => (
          <>
            <div className='dashboard_options'>
              <p className='dash_option_title'>Samples Collected</p>
              <span className='suspected_options_number'>
                {data.samplecollected || 0}
              </span>
            </div>
            <div className='dashboard_options'>
              <p className='dash_option_title'>Negative Cases</p>
              <span className='confirmed_opt_number'>{data.negative || 0}</span>
            </div>
            <div className='dashboard_options'>
              <p className='dash_option_title'>Positive Cases</p>
              <span className='quarantine_opt_number'>
                {data.confirmed}
              </span>
            </div>
            <div className='dashboard_options'>
              <p className='dash_option_title'>Recovered</p>
              <span className='recovered_opt_number'>{data.recovered || 0}</span>
            </div>
            <div className='dashboard_options'>
              <p className='dash_option_title'>Active Cases</p>
              <span className='active_opt_number'>{data.active || 0}</span>
            </div>
            <div className='dashboard_options'>
              <p className='dash_option_title'>Deceased</p>
              <span className='deceased_opt_number'>{data.deceased || 0}</span>
            </div>
          </>
        ))}
      </div>
    </Fragment>
  );
}
export default DashboardOptions