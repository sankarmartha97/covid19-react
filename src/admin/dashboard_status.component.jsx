import React, {Component,Fragment} from 'react';

// const DashboardCurrentStatus = () => {
export default class DashboardCurrentStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }


  //
  componentDidMount() {
    this.currentStatusData();
  }


  //
  currentStatusData = async () => {
    let id = localStorage.getItem('request');
    try {
      this.setState({ loading: true });
      await fetch(`${process.env.REACT_APP_URL}/status/report?q=${id}`)
        .then((res) => res.json())
        .then((data) =>
          this.setState({ data }, () => {
            this.setState({ loading: false });
          })
        );
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };



  //render main component
  render() {
    const loading = this.state.loading;
    const data = this.state.data;
    return (
      <Fragment>
        {!loading && data.length ? (
          <CurrentStatusDataComponent data={data} />
        ) : (
          <div className='loader_section'>
            <div className='loader'></div>
          </div>
        )}
      </Fragment>
    );
  }
}







//child component
const CurrentStatusDataComponent = (props) => {
  const data = props.data;
  // console.log(localStorage.getItem('name'));
  const dName = localStorage.getItem('name');
  return (
    <>
      <div className='dash_update_title'>
        <p>{dName} District Current Status</p>
      </div>
      {/* {data.map((data) => ( */}
        <div className='status_container'>
          <div className='status_section'>
            <p className='status_title'>Tested at Check Gates</p>
            <h3 className='screened_number'>{data[1].check_gate_tested }</h3>
          </div>
          <div className='status_section'>
            <p className='status_title'>Tested at Flu Clinics/ Health Facilities</p>
            <h3 className='suspected_number'>{data[1].health_facilities_tested}</h3>
          </div>

          <div className='status_section'>
            <p className='status_title'> persons tested today</p>
            <h3 className='sample_number'>{data[1].tested_today}</h3>
          </div>

          <div className='status_section'>
            <p className='status_title'> cumulative persons tested</p>
            <h3 className='sample_number'>{data[1].cumulative_tested}</h3>
          </div>
          
          <div className='status_section'>
            <p className='status_title'> Negative cases Today</p>
            <h3 className='negative_number'>{data[1].negative_today}</h3>
          </div>

          <div className='status_section'>
            <p className='status_title'> Positive Cases today</p>
            <h3 className='positive_number'>{data[1].positive_today}</h3>
          </div>

          <div className='status_section'>
            <p className='status_title'>cumulative Positive Cases</p>
            <h3 className='positive_number'>{data[1].cumulative_positive}</h3>
          </div>

          <div className='status_section'>
            <p className='status_title'> Cured/ Discharged Today</p>
            <h3 className='isolation_number'>{data[1].cured_today}</h3>
          </div>

          <div className='status_section'>
            <p className='status_title'>cumulative Cured/ Discharged </p>
            <h3 className='isolation_number'>{data[1].cumulative_cured}</h3>
          </div>

          <div className='status_section'>
            <p className='status_title'> active cases today</p>
            <h3 className='negative_number'>{data[1].active_today}</h3>
          </div>

          <div className='status_section'>
            <p className='status_title'> Deceased Today</p>
            <h3 className='deceased_number'>{data[1].death_today}</h3>
          </div> 

          <div className='status_section'>
            <p className='status_title'>cumulative Deceased</p>
            <h3 className='deceased_number'>{data[1].death}</h3>
          </div>          
          
          <div className='status_section'>
            <p className='status_title'>DCH</p>
            <h3 className='deceased_number'>{data[1].covid_hospitals}</h3>
          </div>          
          <div className='status_section'>
            <p className='status_title'>Beds in DCH</p>
            <h3 className='deceased_number'>{data[1].covid_hospital_beds}</h3>
          </div>          
          <div className='status_section'>
            <p className='status_title'>Admitted in DCH</p>
            <h3 className='deceased_number'>{data[1].covid_hospital_admitted}</h3>
          </div>         
           <div className='status_section'>
            <p className='status_title'>ICU Beds in DCH</p>
            <h3 className='deceased_number'>{data[1].covid_hospital_icu_beds}</h3>
          </div>         
           <div className='status_section'>
            <p className='status_title'>ICU occupied in DCH</p>
            <h3 className='deceased_number'>{data[1].covid_hospitals_icu_bed_occupied}</h3>
          </div>          <div className='status_section'>
            <p className='status_title'>O2 Beds in DCH</p>
            <h3 className='deceased_number'>{data[1].covid_hospital_o2_beds}</h3>
          </div>          <div className='status_section'>
            <p className='status_title'>O2 Bed Occupied in DCH</p>
            <h3 className='deceased_number'>{data[1].covid_hospital_o2_bed_occupied}</h3>
          </div>          <div className='status_section'>
            <p className='status_title'>Non-O2 Bed in DCH</p>
            <h3 className='deceased_number'>{data[1].covid_hospital_non_o2_beds}</h3>
          </div>          <div className='status_section'>
            <p className='status_title'>Non-O2 Bed occupied in DCH</p>
            <h3 className='deceased_number'>{data[1].covid_hospital_non_o2_bed_occupied}</h3>
          </div>          <div className='status_section'>
            <p className='status_title'>DCHC</p>
            <h3 className='deceased_number'>{data[1].dchc}</h3>
          </div>          
          <div className='status_section'>
            <p className='status_title'>Beds in DCHC</p>
            <h3 className='deceased_number'>{data[1].dchc_beds}</h3>
          </div>          
          <div className='status_section'>
            <p className='status_title'>Admitted in DCHC</p>
            <h3 className='deceased_number'>{data[1].dchc_admitted}</h3>
          </div>          
          
          <div className='status_section'>
            <p className='status_title'>ICU Beds in DCHC</p>
            <h3 className='deceased_number'>{data[1].dchc_icu_beds}</h3>
          </div>          
          
          <div className='status_section'>
            <p className='status_title'>ICU Beds occupied in DCHC</p>
            <h3 className='deceased_number'>{data[1].dchc_icu_beds_occupied}</h3>
          </div>          
          
          <div className='status_section'>
            <p className='status_title'>O2 Beds in DCHC</p>
            <h3 className='deceased_number'>{data[1].dchc_o2_beds}</h3>
          </div>          
          
          <div className='status_section'>
            <p className='status_title'>O2 Beds Occupied in DCHC</p>
            <h3 className='deceased_number'>{data[1].dchc_o2_occupied}</h3>
          </div>          
          
          <div className='status_section'>
            <p className='status_title'>Non-O2 Beds in DCHC</p>
            <h3 className='deceased_number'>{data[1].dchc_non_o2_beds}</h3>
          </div>          
          
          <div className='status_section'>
            <p className='status_title'>Non-O2 Beds Occupied in DCHC</p>
            <h3 className='deceased_number'>{data[1].dchc_non_o2_beds_occupied}</h3>
          </div>          
          
          <div className='status_section'>
            <p className='status_title'>COVID Care Centres</p>
            <h3 className='deceased_number'>{data[1].ccc}</h3>
          </div>          
          
          <div className='status_section'>
            <p className='status_title'>Bed in COVID Care Centres</p>
            <h3 className='deceased_number'>{data[1].ccc_beds}</h3>
          </div>          
          
          <div className='status_section'>
            <p className='status_title'>Admitted in COVID Care Centres</p>
            <h3 className='deceased_number'>{data[1].ccc_admitted}</h3>
          </div>   

          <div className='status_section'>
            <p className='status_title'>O2 Beds in CCC</p>
            <h3 className='deceased_number'>{data[1].ccc_o2_beds}</h3>
          </div>          
          
          <div className='status_section'>
            <p className='status_title'>O2 Beds Occupied in CCC</p>
            <h3 className='deceased_number'>{data[1].ccc_o2_occupied}</h3>
          </div>          
          
          <div className='status_section'>
            <p className='status_title'>Non-O2 Beds in CCC</p>
            <h3 className='deceased_number'>{data[1].ccc_non_o2_beds}</h3>
          </div>  

          <div className='status_section'>
            <p className='status_title'>Non-O2 Beds Occupied in CCC</p>
            <h3 className='deceased_number'>{data[1].ccc_non_o2_occupied}</h3>
          </div>     
          
          <div className='status_section'>
            <p className='status_title'>Home Isolation</p>
            <h3 className='deceased_number'>{data[1].home_isolation}</h3>
          </div>          
          
          {/* <div className='status_section'>
            <p className='status_title'>FLWs received first dose</p>
            <h3 className='deceased_number'>{data[1].flw_1st_dose_received}</h3>
          </div>          
          
          <div className='status_section'>
            <p className='status_title'>FLWs fully inoculated</p>
            <h3 className='deceased_number'>{data[1].flw_fully_inoculated}</h3>
          </div>          
          
          <div className='status_section'>
            <p className='status_title'>HCWs received first dose</p>
            <h3 className='deceased_number'>{data[1].hcw_1st_dose_received}</h3>
          </div>          
          
          <div className='status_section'>
            <p className='status_title'>HCWs fully inoculated</p>
            <h3 className='deceased_number'>{data[1].hcw_fully_inoculated}</h3>
          </div>          
          <div className='status_section'>
            <p className='status_title'>45+ years received first dose</p>
            <h3 className='deceased_number'>{data[1].fully_inoculated_45years}</h3>
          </div>          
          <div className='status_section'>
            <p className='status_title'>45+ years fully inoculated</p>
            <h3 className='deceased_number'>{data[1].received_vaccination_45years}</h3>
          </div>          
          <div className='status_section'>
            <p className='status_title'>18 to 44 years received first dose</p>
            <h3 className='deceased_number'>{data[1].received_1st_dose_18_to_44years}</h3>
          </div>          
          <div className='status_section'>
            <p className='status_title'>18 to 44 years fully inoculated</p>
            <h3 className='deceased_number'>{data[1].fully_inoculated_18_to_44years}</h3>
          </div>           */}
          <div className='status_section'>
            <p className='status_title'>1st Dose 18+ years</p>
            <h3 className='deceased_number'>{data[1].total_received_1st_dose}</h3>
          </div>          <div className='status_section'>
            <p className='status_title'>2nd Dose 18+ years</p>
            <h3 className='deceased_number'>{data[1].total_fully_inoculated}</h3>
          </div>
          <div className='status_section'>
            <p className='status_title'>No. of violations reported for not following Covid Appropriate Behaviour today</p>
            <h3 className='deceased_number'>{data[1].violations_reported_today}</h3>
          </div>
          <div className='status_section'>
            <p className='status_title'>Cumulative number of violations reported for not following Covid
Appropriate Behaviour</p>
            <h3 className='deceased_number'>{data[1].cumulative_violations_reported}</h3>
          </div>
          <div className='status_section'>
            <p className='status_title'>Fine imposed for not following Covid Appropriate Behaviour today (in Rs.)</p>
            <h3 className='deceased_number'>{data[1].fine_imposed_today}</h3>
          </div>
          <div className='status_section'>
            <p className='status_title'>Cumulative amount of fine imposed for not following Covid Appropriate
Behaviour (in Rs.)</p>
            <h3 className='deceased_number'>{data[1].cumulative_fine_imposed}</h3>
          </div>
        </div>
      {/* )} */}
    </>
  );
};