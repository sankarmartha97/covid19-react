import React, { Component, Fragment } from 'react';
import {
  i18n,
  Table, Pagination, Icon, DatePicker, Select, Button, MessageBox
} from 'element-react';
import 'element-theme-default';
import { format } from 'date-fns';
import locale from 'element-react/src/locale/lang/en';
import AuthService from '../authServices/AuthService';
import axios from 'axios';
i18n.use(locale);


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
        },
        {
          label: "Operations",
          fixed: 'right',
          width: 160,
          render: (data) => {
            return <div>
              <Button plain={true} type="info" size="mini" onClick={() => { this.OnUnApprove(data) }}><i class="fas  fa-pen tab_ico icon-edit-row"></i>Unapprove</Button>
            </div>
          }
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
    try {
      this.setState({ loading: true })
      var q = '?';
      if (district !== 'null') {
        q = q +`district=${district}`
      }
      if (date !== null && date !== 'null') {
        q = q + `&date=${date}`
      }
      await fetch(`${process.env.REACT_APP_URL}/recentapproved${q}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'authorization': localStorage.getItem('id_token'),
        }
      })
        .then((res) => res.json())
        .then((res) =>
          this.setState({ data: res.data, }, () => {
            this.setRecordsByPage();
            this.setState({ loading: false })
          })
        );
    } catch (error) {
      console.log(error)
      this.setState({ loading: true })
    }
  }

  currentStatusData = async () => {
    if (!this.Auth.isTokenExpired) {
      this.Auth.logout()
    } else {
      try {
        this.setState({ loading: true });
        await fetch(`${process.env.REACT_APP_URL}/recentapproved`, {
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
    this.datafilter(district, date);
  }

  onDatechangeHandler(data) {
    var date = 'null',
      district = this.state.value;
    if (district === '') {
      district = 'null';
    }
    if (data != null) {
      date = format(data, 'yyyy-MM-dd');
    }
    this.datafilter(district, date);
  }

  onSizeChange = (size) => {
    this.setState({ loading: true })
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

  OnUnApprove = async (data) => {
    try {
      axios.put(`${process.env.REACT_APP_URL}/recheckReport`, {
        id:data.id,
      }, {
        headers: {
          'Authorization': localStorage.getItem('id_token'),
        }
      })
        .then((res) => {
          if (res.data.status == 200) {
            MessageBox.alert(`${res.data.message}`, 'Success', {
              showConfirmButton: true,
              type: 'success',
            })
              .then(() => {
                window.location.reload(true);
              })
              .catch(() => {
                window.location.reload(true);
              });
          } else {
            MessageBox.alert(`${res.data.message}`, 'Error', {
              showConfirmButton: true,
              type: 'error',
            })
          }
        });
    }
    catch (err) {
      console.log(err);
    }
  }

  render() {
    const { datevalue } = this.state;
    const { value } = this.state;
    const loading = this.state.loading;
    const length = this.state.data.length || 0;
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
        </div>

        <div className='citizen_body_section'>
          {length === 0 ? (
            <RecordNotFound/> ) : (
            <div>
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
          )}
        </div>
      </Fragment>
    );
  }
}

const RecordNotFound = () => {
  return (
    <div className="container user_not_found">
      <i className="fas fa-users user_ico"></i>
      <p>NO Data found</p>
    </div>
  )
}