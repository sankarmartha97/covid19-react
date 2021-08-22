import React, { Component, Fragment } from 'react'
import Chart1 from './chart1'
import Map from './map';
import DashboardOptions from './dashboard_options';
import DistrictWiseReport from './district_wise_report';
import SiteFooter from './footer.component';
import Chart2 from './chart2';


export default class BodyLayout extends Component {
    render() {
        return (
            <Fragment>
            <div className='container-fluid'>
              <div className='row dash_body_main_wrapper'>
                <div className='col-md-3 col-lg-3 '>
                  <div className='total_visitors_section fadeInUp' style={{ animationDelay: '1s' }}>
                    <DistrictWiseReport />
                  </div>
                </div>
                <div className='col-md-9 col-lg-9'>
                  {/* dashboard map and options row */}
                  <div className='row   '>
                    <div className='col-md-8 col-lg-8 fadeInUp' style={{ animationDelay: '1.25s' }}>
                      <Map />
                    </div>
                    <div className='col-md-4 col-lg-4 fadeInUp' style={{ animationDelay: '1.45s' }}>
                      <DashboardOptions />
                    </div>
                  </div>
                  {/* end of dashboard options row  */}
    
                  {/* dashborad chart second row */}
                  <div className='row body_chart_wrapper'>
                    <div className='col-md-8 col-lg-8 col-sm-12 fadeInUp' style={{ animationDelay: '1.65s' }}>
                      <Chart1 />
                    </div>
                    <div className='col-md-4 col-lg-4 col-sm-12'>
                      <div className='dashboard_chart_2 fadeInUp' style={{ animationDelay: '1.85s' }}>
                        <p>Cumulative District Report</p>
                        <Chart2 />
                      </div>
                    </div>
                  </div>
                  {/* end of dashboard chart row */}
                </div>
              </div>
              {/* end of dash body main wrapper */}
              <div className='row site_footer_wrapper'>
                {/* <SiteFooter /> */}
              </div>
            </div>
          </Fragment>
        )
    }
}