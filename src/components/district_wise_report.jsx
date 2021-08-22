import React, { Fragment } from 'react';
import  {useState, useEffect} from 'react';
import ScrollBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// visitor list component district wise
const DVisitorList =(prpos) =>{
    return(
        <div className="dist_visitor_list">
            <div className="dist_visitor_inner_list">{prpos.report.district}</div>
            <div className="confirmed_inner_list">{prpos.report.samplecollected}</div>
            <div className="deceased_inner_list">{prpos.report.negative}</div>
            <div className="recovered_inner_list">{prpos.report.confirmed}</div>
            <div className="active_inner_list">{prpos.report.active}</div>
        </div>
    )
}

const DistrictWiseReport = () => {

  const [hasError, setErrors] = useState(false);
  const [report, setReport] = useState([]);

  async function fetchdata(){
      // const res = await fetch(`${process.env.REACT_APP_URL}/status/reportDistrict`);
      // res.json()
      // .then(res => setReport(res))
      // .catch(err => setErrors(err));
  }

  useEffect(()=>{
      fetchdata();
  },[])

    // render main component
    return (
      <Fragment>
        <div className='dist_report_title'>
          <p>DISTRICT WISE REPORT</p>
        </div>
        <div className='dist_report_header'>
          <div className='dist_report_table_title titile_dist'>DISTRICT </div>
          <div className='title_confd'>Sample Collected</div>
          <div className='title_rcvrd'>-Ve</div>
          <div className='titledcsd'>+Ve</div>
          <div className='titleactive'>Active</div>
        </div>
        <div className='total_district_report'>
          {/* <ScrollBar style={{ maxHeight: '400px' }}>
            {report.map((r, i) => (
              <DVisitorList key={i} report={r} />
            ))}
          </ScrollBar> */}
        </div>
      </Fragment>
    );
}

export default DistrictWiseReport;