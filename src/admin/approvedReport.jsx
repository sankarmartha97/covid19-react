import React, { Component, Fragment } from 'react';
import {
  i18n,
  Table, Pagination, Icon, DatePicker, Select
} from 'element-react';
import 'element-theme-default';
import { format } from 'date-fns';
import { CSVLink } from "react-csv";
import locale from 'element-react/src/locale/lang/en';
import AuthService from '../authServices/AuthService';
i18n.use(locale);
const Auth = new AuthService();

const headers = [
  {
    label: "Date",
    key: "date",
  },
  {
    label: "Name",
    key: "name"
  },
  {
    label: "Check Gate Tested",
    key: "check_gate_tested"
  },
  {
    label: "Health Facility Tested",
    key: "health_facilities_tested",
  },
  {
    label: "Total Tested",
    key: "tested"
  },
  {
    label: "Tested Positive Today",
    key: "tested_positive"
  },
  {
    label: "Tested Negative Today",
    key: "tested_negative"
  },
  {
    label: "Cured Today",
    key: "cured"
  },
  {
    label: "Death Today",
    key: "death"
  },
  {
    label: "Active Cases",
    key: "active_case"
  },
  {
    label: "Cumulative Tested Till Date",
    key: "cumulative_tested"
  },
  {
    label: "Cumulative Positive Till Date",
    key: "cumulative_positive"
  },
  {
    label: "Cumulative Cured Till Date",
    key: "cumulative_cured"
  },
  {
    label: "Cumulative Deaths Till Date",
    key: "cumulative_deaths"
  },
  {
    label: "No. Of. DCH",
    key: "covid_hospitals"
  },
  {
    label: "DCH Beds",
    key: "covid_hospital_beds"
  },
  {
    label: "DCH Admitted",
    key: "covid_hospital_admitted"
  },
  {
    label: "DCH ICU Beds",
    key: "covid_hospital_icu_beds"
  },
  {
    label: "DCH ICU Beds Occupied",
    key: "covid_hospitals_icu_bed_occupied"
  },
  {
    label: "DCH O2 Beds",
    key: "covid_hospital_o2_beds"
  },
  {
    label: "DCH O2 Beds Occupied",
    key: "covid_hospital_o2_bed_occupied"
  },
  {
    label: "DCH Non-O2 Beds",
    key: "covid_hospital_non_o2_beds"
  },
  {
    label: "DCH Non-O2 Beds Occupied",
    key: "covid_hospital_non_o2_bed_occupied"
  },
  {
    label: "No. Of. DCHC",
    key: "dchc"
  },
  {
    label: "DCHC Beds",
    key: "dchc_beds"
  },
  {
    label: "DCHC Admitted",
    key: "dchc_admitted"
  },
  {
    label: "DCHC ICU Beds",
    key: "dchc_icu_beds"
  },
  {
    label: "DCHC ICU Beds Occupied",
    key: "dchc_icu_beds_occupied"
  },
  {
    label: "DCHC Non-O2 Beds Occupied",
    key: "dchc_o2_beds"
  },
  {
    label: "DCHC O2 Beds Occupied",
    key: "dchc_o2_occupied"
  },
  {
    label: "DCHC Non-O2 Beds",
    key: "dchc_non_o2_beds"
  },
  {
    label: "DCHC Non-O2 Beds Occupied",
    key: "dchc_non_o2_beds_occupied"
  },
  {
    label: "No. Of. CCC",
    key: "ccc"
  },
  {
    label: "CCC Beds",
    key: "ccc_beds"
  },
  {
    label: "CCC Admitted",
    key: "ccc_admitted"
  },
  {
    label: "CCC O2 Beds",
    key: "ccc_o2_beds"
  },
  {
    label: "CCC O2 Occupied",
    key: "ccc_o2_occupied"
  },
  {
    label: "CCC Non-O2 Beds",
    key: "ccc_non_o2_beds"
  },
  {
    label: "CCC Non-O2 Beds Occupied",
    key: "ccc_non_o2_occupied"
  },
  {
    label: "Home Isolation",
    key: "home_isolation"
  },
  {
    label: "1st Dose 18+ years",
    key: "total_received_1st_dose"
  },
  {
    label: "2nd Dose 18+ years",
    key: "total_fully_inoculated"
  },
  {
      label: "Fine Imposed For Not Following Covid Appropriate Behaviour Today (In Rs.)",
      key: "fine_imposed_today"
  },
  {
      label: "Cumulative Amount Of Fine Imposed For Not Following Covid Appropriate Behaviour (In Rs.)",
      key: "cumulative_fine_imposed"
  },
  {
      label: "No. Of Violations Reported For Not Following Covid Appropriate Behaviour Today",
      key: "violations_reported_today"
  },
  {
      label: "Cumulative Number Of Violations Reported For Not Following Covid Appropriate Behaviour",
      key: "cumulative_violations_reported"
  }
];



export default class ApprovedReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          label: "Updated At",  
          prop: "modified",
          width: 190,
          fixed: 'left',
          sortable: true,
          render: function (data) {
            return (
              <span>
                <Icon name='time' />
                <span style={{ marginLeft: '10px' }}>{format(new Date(data.modified), 'dd-MM-YYY HH:MM:SS')}</span>
              </span>)
          }
        },
        {
          label: "Updated At",  
          prop: "modified_by",
          width: 140,
          fixed: 'left'
        },
        {
          label: "Date",  
          prop: "date",
          width: 140,
          fixed: 'left',
          sortable: true,
          render: function (data) {
            return (
              <span>
                <Icon name='time' />
                <span style={{ marginLeft: '10px' }}>{format(new Date(data.date), 'dd-MM-YYY')}</span>
              </span>)
          }
        },
        {
          label: "Name",
          prop: "name",
          width: 140,
          sortable: true,
          fixed: 'left'
        },
        {
          label: "Check Gate Tested",
          width: 150,
          prop: "check_gate_tested"
        },
        {
          label: "Health Facility Tested",
          width: 180,
          prop: "health_facilities_tested",
        },
        {
          label: "Total Tested",
          width: 130,
          prop: "tested"
        },
        {
          label: "Tested Positive Today",
          width: 190,
          prop: "tested_positive"
        },
        {
          label: "Tested Negative Today",
          width: 190,
          prop: "tested_negative"
        },
        {
          label: "Cured Today",
          width: 130,
          prop: "cured"
        },
        {
          label: "Death Today",
          width: 130,
          prop: "death"
        },
        {
          label: "Active Cases",
          width: 130,
          prop: "active_case"
        },
        {
          label: "Cumulative Tested Till Date",
          width: 230,
          prop: "cumulative_tested"
        },
        {
          label: "Cumulative Positive Till Date",
          width: 230,
          prop: "cumulative_positive"
        },
        {
          label: "Cumulative Cured Till Date",
          width: 230,
          prop: "cumulative_cured"
        },
        {
          label: "Cumulative Deaths Till Date",
          width: 230,
          prop: "cumulative_deaths"
        },
        {
          label: "No. Of. DCH",
          width: 130,
          prop: "covid_hospitals"
        },
        {
          label: "DCH Beds",
          width: 130,
          prop: "covid_hospital_beds"
        },
        {
          label: "DCH Admitted",
          width: 150,
          prop: "covid_hospital_admitted"
        },
        {
          label: "DCH ICU Beds",
          width: 130,
          prop: "covid_hospital_icu_beds"
        },
        {
          label: "DCH ICU Beds Occupied",
          width: 210,
          prop: "covid_hospitals_icu_bed_occupied"
        },
        {
          label: "DCH O2 Beds",
          width: 130,
          prop: "covid_hospital_o2_beds"
        },
        {
          label: "DCH O2 Beds Occupied",
          width: 210,
          prop: "covid_hospital_o2_bed_occupied"
        },
        {
          label: "DCH Non-O2 Beds",
          width: 180,
          prop: "covid_hospital_non_o2_beds"
        },
        {
          label: "DCH Non-O2 Beds Occupied",
          width: 230,
          prop: "covid_hospital_non_o2_bed_occupied"
        },
        {
          label: "No. Of. DCHC",
          width: 150,
          prop: "dchc"
        },
        {
          label: "DCHC Beds",
          width: 150,
          prop: "dchc_beds"
        },
        {
          label: "DCHC Admitted",
          width: 150,
          prop: "dchc_admitted"
        },
        {
          label: "DCHC ICU Beds",
          width: 150,
          prop: "dchc_icu_beds"
        },
        {
          label: "DCHC ICU Beds Occupied",
          width: 230,
          prop: "dchc_icu_beds_occupied"
        },
        {
          label: "DCHC Non-O2 Beds Occupied",
          width: 240,
          prop: "dchc_o2_beds"
        },
        {
          label: "DCHC O2 Beds Occupied",
          width: 210,
          prop: "dchc_o2_occupied"
        },
        {
          label: "DCHC Non-O2 Beds",
          width: 190,
          prop: "dchc_non_o2_beds"
        },
        {
          label: "DCHC Non-O2 Beds Occupied",
          width: 250,
          prop: "dchc_non_o2_beds_occupied"
        },
        {
          label: "No. Of. CCC",
          width: 150,
          prop: "ccc"
        },
        {
          label: "CCC Beds",
          width: 150,
          prop: "ccc_beds"
        },
        {
          label: "CCC Admitted",
          width: 150,
          prop: "ccc_admitted"
        },
        {
          label: "CCC O2 Beds",
          width: 150,
          prop: "ccc_o2_beds"
        },
        {
          label: "CCC O2 Occupied",
          width: 150,
          prop: "ccc_o2_occupied"
        },
        {
          label: "CCC Non-O2 Beds",
          width: 150,
          prop: "ccc_non_o2_beds"
        },
        {
          label: "CCC Non-O2 Beds Occupied",
          width: 170,
          prop: "ccc_non_o2_occupied"
        },
        {
          label: "Home Isolation",
          width: 150,
          prop: "home_isolation"
        },
        {
          label: "1st Dose 18+ years",
          width: 150,
          prop: "total_received_1st_dose"
        },
        {
          label: "2nd Dose 18+ years",
          width: 150,
          prop: "total_fully_inoculated"
        },
        {
            label: "Fine Imposed For Not Following Covid Appropriate Behaviour Today (In Rs.)",
            width: 190,
            prop: "fine_imposed_today"
        },
        {
            label: "Cumulative Amount Of Fine Imposed For Not Following Covid Appropriate Behaviour (In Rs.)",
            width: 190,
            prop: "cumulative_fine_imposed"
        },
        {
            label: "No. Of Violations Reported For Not Following Covid Appropriate Behaviour Today",
            width: 190,
            prop: "violations_reported_today"
        },
        {
            label: "Cumulative Number Of Violations Reported For Not Following Covid Appropriate Behaviour",
            width: 190,
            prop: "cumulative_violations_reported"
        }
      ],
      value: '',
      districtValue: '',
      datevalue: null,
      data: [],
      dataCopy: [],
      districtdata: [],
      loading: false,
      data_by_page: [],
      current_page: 1,
      page_size: 10,
      total: 1,
    }
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.currentStatusData();
    this.districtlist();
  }

  currentStatusData = async () => {
    if (!this.Auth.isTokenExpired) {
      this.Auth.logout()
    } else {
      try {
        this.setState({ loading: true });
        await fetch(`${process.env.REACT_APP_URL}/admin/approvedReports`, {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': localStorage.getItem('id_token'),
          }
        })
          .then((res) => res.json())
          .then((res) =>
            this.setState({ data: res.data, dataCopy: res.data }, () => {
              this.setRecordsByPage();
              this.setState({ loading: false });
            })
          );
      } catch (error) {
        console.log(error);
        this.setState({ loading: true })
      }
    }
  };

  districtlist = async () => {
    try {
      await fetch(`${process.env.REACT_APP_URL}/districtlist`)
        .then((res) => res.json())
        .then((districtdata) => this.setState({ districtdata }));
    } catch (error) {
      console.log(error);
    }
  };

  datafilter = async (district, date) => {
    // try {
    //   // console.log(district, date);
    //   var district = district;
    //   if(district=='null'){
    //     district = null;
    //   }
    //   console.log(district);
    //   var jsonObject = this.state.data;
    //   var result= jsonObject.filter(obj=> obj.name == district);
    //   console.log(result);
    //   if(date = null){
    //     // var results2 = result.filter(obj=>obj.date == date);
    //     // console.log(results2);
    //     return result;
    //   }
    //   format(result[0].date,'yyyy-MM-dd');
    //   var results2 = result.filter(obj=>format(obj.date,'yyyy-MM-dd') == date);
    //   console.log(results2);
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      this.setState({ loading: true })
      await fetch(`${process.env.REACT_APP_URL}/admin/approvedReports?district=${district}&date=${date}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'authorization': localStorage.getItem('id_token'),
        }
      })
        .then((res) => res.json())
        .then((res) =>
          this.setState({ data: res.data, }, () => {
            this.setRecordsByPage();
            // setTimeout(() => {
            this.setState({ loading: false })
            // }, 250);
          })
        );
    } catch (error) {
      console.log(error)
      this.setState({ loading: true })
    }
  }


  onDistrictChangeHandler(data) {
    var date = 'null',
      district = data;
    this.setState({ value: data });
    if (data === '') {
      district = 'null';
    }
    if (this.state.datevalue != null) {
      date = format(this.state.datevalue, 'yyyy-MM-dd');
    } else {
      date = this.state.datevalue;
    }
    console.log(district, date);
    // this.report(district, date);
    this.datafilter(district, date);
  }

  onDatechangeHandler(data) {
    var date = 'null',
      district = this.state.value;
    if (district === '') {
      // district = this.setState.value;
      district = 'null';
    }
    if (data != null) {
      date = format(data, 'yyyy-MM-dd');
    }
    console.log(date, district);
    // this.report(district, date);
    this.datafilter(district, date);
  }

  onSizeChange = (size) => {
    this.setState({ loading: true })
    console.log('onChange:size=', size);
    this.setState({ current_page: 1 });
    this.setState({ page_size: size }, () => {
      this.setRecordsByPage();
      setTimeout(() => {
        this.setState({ loading: false })
      }, 250)
    });
  };

  onPageChange = (current) => {
    this.setState({ loading: true });
    console.log('onChange:current=', current);
    this.setState({ current_page: current }, () => {
      this.setRecordsByPage();
      setTimeout(() => {
        this.setState({ loading: false });
      }, 250);
    });
  };

  setRecordsByPage() {
    this.setState({ total: this.state.data.length });
    var first_record_index =
      (this.state.current_page - 1) * this.state.page_size;
    var last_record_index = this.state.page_size * this.state.current_page;
    this.setState({
      data_by_page: this.state.data.slice(
        first_record_index,
        last_record_index
      ),
    });
  }

  render() {
    const { datevalue } = this.state;
    const { value } = this.state;
    const loading = this.state.loading;
    const length = this.state.data.length;
    if (length === 0) {
      return <UserNotFound />
    }
    return (
      <Fragment>
        <div className='citizen_titile_section'>
          <div className='body_title'>
            <p>District Approved Report</p>
          </div>
        </div>
        <div className='report_filter_section'>
          <label htmlFor='filter_title' className='report_filter_title'>
            Filter -
          </label>


          {/* Select district */}
          <Select
            value={value}
            className='mr-3'
            placeholder='Select District'
            onChange={this.onDistrictChangeHandler.bind(this)}
            clearable={true}
          >
            {this.state.districtdata.map((el) => {
              return (
                <Select.Option
                  filterable={true}
                  key={el.id}
                  label={el.name}
                  value={el.name}
                />
              );
            })}
          </Select>

          {/* select date  */}
          <DatePicker
            value={datevalue}
            placeholder='Pick a day'
            onChange={(date) => {
              console.debug('DatePicker1 changed: ', date);
              this.setState({ datevalue: date });
              this.onDatechangeHandler(date);
            }}
          />
          {/* <CSVLink data={this.state.data} headers={headers}>Export Data</CSVLink> */}
          <button className="btn btn_cat_csv">
            <CSVLink filename={`District Approved Report ${Date.now()}.csv`} data={this.state.data} headers={headers}>Download CSV
              <i className="fas fa-file-csv exe_csv"></i>
            </CSVLink>
          </button>

        </div>

        <div className='citizen_body_section'>
          {loading ? (
            <div className='loader_section1'>
              <div className='loader'></div>
            </div>
          ) : (
            <>
              <Table
                className='en-US'
                style={{ width: '100%' }}
                columns={this.state.columns}
                data={this.state.data_by_page}
                border={true}
                height={400}
                fit={true}
              />
              <div className='pagination_section'>
                <Pagination
                  layout='total, sizes, prev, pager, next, jumper'
                  total={this.state.total}
                  pageSizes={[10, 20, 30, 40, 50]}
                  pageSize={this.state.page_size}
                  currentPage={this.state.current_page}
                  onSizeChange={this.onSizeChange}
                  onCurrentChange={this.onPageChange}
                  className='mb-3 mt-3'
                />
              </div>
            </>
          )}
        </div>
      </Fragment>
    );
  }
}

const UserNotFound = () => {
  return (
    <div className="container user_not_found">
      <i className="fas fa-users user_ico"></i>
      <p>Waiting For the Data</p>
    </div>
  )
}