import React, { Component, Fragment } from 'react';
import {
  i18n,
  DatePicker
} from 'element-react';
import 'element-theme-default';
import { format } from 'date-fns';
import moment from "moment";
import locale from 'element-react/src/locale/lang/en';
import AuthService from '../authServices/AuthService';
// import MyDocument2 from '../components/pdfGenerate';
i18n.use(locale);

// let date1 = 'Total 30th July 2021';
// let date2 = 'Total 29th July 2021';

const totalPopulation = sessionStorage.getItem("totalpopulations") || 1062840;
//Added Sample Data(Incorrect), Get from API

export const DataRows = ({ inputData, dataRes }) =>
  inputData.map((data, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{data.label}</td>
        {data.key === "tested_positive" ? (
          <td >
            {dataRes[0][data.key]} (
            {dataRes[0]["tested"]
              ? (
                (dataRes[0]["tested_positive"] / dataRes[0]["tested"]) *
                100
              ).toFixed(2)
              : "0.00"}
            %)
          </td>
        ) : data.key === "cumulative_cured" ? (
          <td >
            {dataRes[0][data.key]} (
            {dataRes[0]["cumulative_positive"]
              ? (
                (dataRes[0]["cumulative_cured"] /
                  dataRes[0]["cumulative_positive"]) *
                100
              ).toFixed(2)
              : "0.00"}
            %)
          </td>
        ) : data.key === "covid_hospitals_icu_bed_occupied" ? (
          <td >
            {dataRes[0][data.key]} (
            {dataRes[0]["covid_hospital_icu_beds"]
              ? (
                (dataRes[0]["covid_hospitals_icu_bed_occupied"] /
                  dataRes[0]["covid_hospital_icu_beds"]) *
                100
              ).toFixed(2)
              : "0.00"}
            %)
          </td>
        ) : data.key === "covid_hospital_o2_bed_occupied" ? (
          <td >
            {dataRes[0][data.key]} (
            {dataRes[0]["covid_hospital_o2_beds"]
              ? (
                (dataRes[0]["covid_hospital_o2_bed_occupied"] /
                  dataRes[0]["covid_hospital_o2_beds"]) *
                100
              ).toFixed(2)
              : "0.00"}
            %)
          </td>
        ) : data.key === "dchc_o2_occupied" ? (
          <td >
            {dataRes[0][data.key]} (
            {dataRes[0]["dchc_o2_beds"]
              ? (
                (dataRes[0]["dchc_o2_occupied"] /
                  dataRes[0]["dchc_o2_beds"]) *
                100
              ).toFixed(2)
              : "0.00"}
            %)
          </td>
        ) : data.key === "total_received_1st_dose" ? (
          <td >
            {dataRes[0][data.key]} (
            {totalPopulation
              ? (
                (dataRes[0]["total_received_1st_dose"] / totalPopulation) *
                100
              ).toFixed(2)
              : "0.00"}
            %)
          </td>
        ) : data.key === "total_fully_inoculated" ? (
          <td >
            {dataRes[0][data.key]} (
            {totalPopulation
              ? (
                (dataRes[0]["total_fully_inoculated"] / totalPopulation) *
                100
              ).toFixed(2)
              : "0.00"}
            %)
          </td>
        ) : (
          <td >{dataRes[0][data.key]}</td>
        )}


        {data.key === "tested_positive" ? (
          <td >
            {dataRes[1][data.key]} (
            {dataRes[1]["tested"]
              ? (
                (dataRes[1]["tested_positive"] / dataRes[1]["tested"]) *
                100
              ).toFixed(2)
              : "0.00"}
            %)
          </td>
        ) : data.key === "cumulative_cured" ? (
          <td >
            {dataRes[1][data.key]} (
            {dataRes[1]["cumulative_positive"]
              ? (
                (dataRes[1]["cumulative_cured"] /
                  dataRes[1]["cumulative_positive"]) *
                100
              ).toFixed(2)
              : "0.00"}
            %)
          </td>
        ) : data.key === "covid_hospitals_icu_bed_occupied" ? (
          <td >
            {dataRes[1][data.key]} (
            {dataRes[1]["covid_hospital_icu_beds"]
              ? (
                (dataRes[1]["covid_hospitals_icu_bed_occupied"] /
                  dataRes[1]["covid_hospital_icu_beds"]) *
                100
              ).toFixed(2)
              : "0.00"}
            %)
          </td>
        ) : data.key === "covid_hospital_o2_bed_occupied" ? (
          <td >
            {dataRes[1][data.key]} (
            {dataRes[1]["covid_hospital_o2_beds"]
              ? (
                (dataRes[1]["covid_hospital_o2_bed_occupied"] /
                  dataRes[1]["covid_hospital_o2_beds"]) *
                100
              ).toFixed(2)
              : "0.00"}
            %)
          </td>
        ) : data.key === "dchc_o2_occupied" ? (
          <td >
            {dataRes[1][data.key]} (
            {dataRes[1]["dchc_o2_beds"]
              ? (
                (dataRes[1]["dchc_o2_occupied"] /
                  dataRes[1]["dchc_o2_beds"]) *
                100
              ).toFixed(2)
              : "0.00"}
            %)
          </td>
        ) : data.key === "total_received_1st_dose" ? (
          <td >
            {dataRes[1][data.key]} (
            {totalPopulation
              ? (
                (dataRes[1]["total_received_1st_dose"] / totalPopulation) *
                100
              ).toFixed(2)
              : "0.00"}
            %)
          </td>
        ) : data.key === "total_fully_inoculated" ? (
          <td >
            {dataRes[1][data.key]} (
            {totalPopulation
              ? (
                (dataRes[1]["total_fully_inoculated"] / totalPopulation) *
                100
              ).toFixed(2)
              : "0.00"}
            %)
          </td>
        ) : (
          <td >{dataRes[1][data.key]}</td>
        )}


      </tr>
    )
  })


export const SubheadingRow = ({ subHeadingData }) => (
  <tr className="subheading-tr">
    <td>{subHeadingData.sl}</td>
    <td>{subHeadingData.label}</td>
    <td></td>
    <td></td>
  </tr>
);

class DataReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      healthScreeningData: [
        { label: "Number of persons tested at Check Gates today", key: "check_gate_tested", },
        { label: "Number of Patients tested in FLU CLINICS/ Health Facilities today", key: "health_facilities_tested", },
      ],
      samplesData: [
        { label: "Number of persons tested today", key: "tested" },
        { label: "Number of persons tested negative today", key: "tested_negative" },
        { label: "Number of persons tested positive today", key: "tested_positive" },
        { label: "Cumulative Positive Cases w.e.f. 01/04/2020 till date", key: "cumulative_positive", },
        { label: "Number of persons cured/ discharged today", key: "cured" },
        { label: "Cumulative number of persons cured /discharged w.e.f. 01/04/2020 till date", key: "cumulative_cured", },
        { label: "Total Active cases as on today", key: "active_case" },
        { label: "COVID-19 deaths today", key: "death" },
        { label: "Cumulative number of COVID-19 Deaths w.e.f. 01/04/2020 till date", key: "cumulative_deaths", },
      ],
      dchData: [
        {
          label: "Number of Dedicated COVID Hospitals (DCH)",
          key: "covid_hospitals",
        },
        { label: "Number of beds in DCH", key: "covid_hospital_beds" },
        {
          label: "Number of persons currently admitted in DCH",
          key: "covid_hospital_admitted",
        },
        { label: "Number of ICU beds in DCH", key: "covid_hospital_icu_beds" },
        {
          label: "Number of ICU beds occupied in DCH",
          key: "covid_hospitals_icu_bed_occupied",
        },
        { label: "Number of O2 beds in DCH", key: "covid_hospital_o2_beds" },
        {
          label: "Number of O2 beds occupied in DCH",
          key: "covid_hospital_o2_bed_occupied",
        },
        { label: "Number of Non-O2 beds in DCH", key: "covid_hospital_non_o2_beds" },
        {
          label: "Number of Non-O2 beds occupied in DCH",
          key: "covid_hospital_non_o2_bed_occupied",
        },
      ],
      dchcData: [
        { label: "Number of Dedicated COVID Health Centres (DCHC)", key: "dchc" },
        { label: "Number of beds in DCHC", key: "dchc_beds" },
        {
          label: "Number of persons currently admitted in DCHC",
          key: "dchc_admitted",
        },
        { label: "Number of ICU beds in DCHC", key: "dchc_icu_beds" },
        {
          label: "Number of ICU beds occupied in DCHC",
          key: "dchc_icu_beds_occupied",
        },
        { label: "Number of O2 beds in DCHC", key: "dchc_o2_beds" },
        {
          label: "Number of O2 beds occupied in DCHC",
          key: "dchc_o2_occupied",
        },
        {
          label: "Number of Non-O2 beds in DCHC",
          key: "dchc_non_o2_beds",
        },
        {
          label: "Number of Non-O2 beds occupied in DCHC",
          key: "dchc_non_o2_beds_occupied",
        },
      ],
      cccData: [
        { label: "Number of COVID Care Centres (CCC)", key: "ccc" },
        { label: "Number of beds in CCC", key: "ccc_beds" },
        { label: "Number of persons currently admitted in CCC", key: "ccc_admitted" },
        { label: "Number of O2 beds in CCC", key: "ccc_o2_beds" },
        { label: "Number of O2 beds occupied in CCC", key: "ccc_o2_occupied" },
        { label: "Number of Non-O2 beds in CCC", key: "ccc_non_o2_beds" },
        {
          label: "Number of Non-O2 beds occupied in CCC",
          key: "ccc_non_o2_occupied",
        },
        {
          label: "Number of persons currently under Home Isolation",
          key: "home_isolation",
        },
      ],

      vaccineData: [
        {
          label: "Total persons who received the first dose",
          key: "total_received_1st_dose",
        },
        { label: "Total persons fully inoculated", key: "total_fully_inoculated" },
      ],

      covidBehaviourData: [
        {
          label:
            "Number of violations reported for not following Covid Appropriate Behaviour today",
          key: "violations_reported_today",
        },
        {
          label:
            "Cumulative number of violations reported for not following Covid Appropriate Behaviour",
          key: "cumulative_violations_reported",
        },
        {
          label:
            "Fine imposed for not following Covid Appropriate Behaviour today (in Rs.)",
          key: "fine_imposed_today",
        },
        {
          label:
            "Cumulative amount of fine imposed for not following Covid Appropriate Behaviour (in Rs.) w.e.f. 01/04/2020 till date",
          key: "cumulative_fine_imposed",
        },
      ],

      subHeading1: { sl: "A", label: "Health Screening & Charges" },
      subHeading2: { sl: "B", label: "Samples Report" },
      subHeading3: { sl: "C", label: "Dedicated Covid Hospitals (DCH)" },
      subHeading4: { sl: "D", label: "Dedicated Covid Health Centres (DCHC)" },
      subHeading5: { sl: "E", label: "COVID Care Centres (CCC)" },
      subHeading6: { sl: "F", label: "Status of Vaccination" },
      subHeading7: { sl: "G", label: "COVID Appropriate Behaviour" },

      datevalue: new Date(localStorage.getItem('lastDataDate')),
      data: [],
      loading: false,
    }
    this.Auth = new AuthService();
  }

  fetchdata = async (date) => {
    if (!this.Auth.isTokenExpired) {
      this.Auth.logout()
    } else {
      try {
        this.setState({ loading: true });
        await fetch(`${process.env.REACT_APP_URL}/admin/report?q=${date}`, {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': localStorage.getItem('id_token'),
          }
        })
          .then((res) => res.json())
          .then((res) =>
            this.setState({ data: res.data }, () => {
              this.setState({ loading: false });
            })
          );
      } catch (e) {
        console.log(e);
        this.setState({ loading: true });
      }
    }
  }

  componentDidMount() {
    var date = localStorage.getItem('lastDataDate');
    this.fetchdata(date)
  }

  pdfview = () => {
    // window.open(`http://localhost:3000/doc`);
    // console.log(this.state.datevalue);
    const date = format(this.state.datevalue, 'yyyy-MM-dd');
    var id = new Date(date).getTime();
    window.open(`/doc/${id}`);
  }

  onDatechangeHandler(data) {
    var date = format(data, 'yyyy-MM-dd');
    this.fetchdata(date);
  }


  render() {
    const { datevalue } = this.state;
    const { loading } = this.state;
    const length = this.state.data.length;
    return (
      <div>
        <div className='citizen_titile_section'>
          <div className='body_title'>
            <p>Report</p>
          </div>
        </div>
        <div className='report_filter_section_data_report'>
          <label htmlFor='filter_title' className='report_filter_title'>
            Filter -
          </label>

          <DatePicker
            value={datevalue}
            placeholder="Pick a range"
            onChange={date => {
              // console.debug('DateRangePicker1 changed: ', date)
              this.setState({ datevalue: date })
              this.onDatechangeHandler(date);
            }}
            disabledDate={time => time.getTime() > new Date(localStorage.getItem('lastDataDate'))}
          />
          <button className="btn btn_cat_csv" onClick={() => this.pdfview()}>Download Report &nbsp;<i class="fas fa-file-download"></i></button>
        </div>
        {length === 0 ? (
          <RecordNotFound />
        ) : (
          <div>
            {loading ? (
              <div className='loader_section1'>
                <div className='loader'></div>
              </div>
            ) : (
              <div className="table-data-report-container">
                <table className="table-data-report">
                  <tr>
                    <th>Sl No</th>
                    <th>Particulars</th>
                    <th>Total {moment(this.state.data[0].date).format("Do MMMM YYYY")}</th>
                    <th>Total {moment(this.state.data[1].date).format("Do MMMM YYYY")}</th>
                  </tr>

                  <SubheadingRow subHeadingData={this.state.subHeading1} />
                  <DataRows inputData={this.state.healthScreeningData} dataRes={this.state.data} />

                  <SubheadingRow subHeadingData={this.state.subHeading2} />
                  <DataRows inputData={this.state.samplesData} dataRes={this.state.data} />

                  <SubheadingRow subHeadingData={this.state.subHeading3} />
                  <DataRows inputData={this.state.dchData} dataRes={this.state.data} />

                  <SubheadingRow subHeadingData={this.state.subHeading4} />
                  <DataRows inputData={this.state.dchcData} dataRes={this.state.data} />

                  <SubheadingRow subHeadingData={this.state.subHeading5} />
                  <DataRows inputData={this.state.cccData} dataRes={this.state.data} />

                  <SubheadingRow subHeadingData={this.state.subHeading6} />
                  <DataRows inputData={this.state.vaccineData} dataRes={this.state.data} />

                  <SubheadingRow subHeadingData={this.state.subHeading7} />
                  <DataRows inputData={this.state.covidBehaviourData} dataRes={this.state.data} />

                </table>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

const RecordNotFound = () => {
  return (
    <div className="container user_not_found">
      <i className="fas fa-users user_ico"></i>
      <p>No Record Found</p>
    </div>
  )
}

export default DataReport
