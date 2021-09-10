import React, { Component, Fragment } from 'react';
import {
    i18n,
    Table, Pagination, Icon, Select, DateRangePicker
} from 'element-react';
import 'element-theme-default';
import { format } from 'date-fns';
import { CSVLink } from "react-csv";
import dateFormat from 'dateformat';
import locale from 'element-react/src/locale/lang/en';
import AuthService from '../authServices/AuthService';
i18n.use(locale);
const Auth = new AuthService();
const headers = [
    {
        label: 'Date',
        key: 'date'
    },
    {
        label: "Name",
        key: "name"
    },
    {
        label: "Tested At Check Gates",
        key: "check_gate_tested"
    },
    {
        label: "Tested At Flu Clinics/ Health Facilities",
        key: "health_facilities_tested",
    },
    {
        label: "Persons Tested Today",
        key: "tested"
    },
    {
        label: "Cumulative Persons Tested",
        key: "cumulative_tested"
    },
    {
        label: "Negative Cases Today",
        key: "tested_negative"
    },
    {
        label: "Positive Cases Today",
        key: "tested_positive"
    },
    {
        label: "Cumulative Positive Cases",
        key: "cumulative_positive"
    },
    {
        label: "Cured/ Discharged Today",
        key: "cured"
    },
    {
        label: "Cumulative Cured/ Discharged",
        key: "cumulative_cured"
    },
    {
        label: "Active Cases Today",
        key: "active_case"
    },
    {
        label: "Deceased Today",
        key: "death"
    },
    {
        label: "Cumulative Deceased",
        key: "cumulative_deaths"
    },
    {
        label: "DCH",
        key: "covid_hospitals"
    },
    {
        label: "Beds In DCH",
        key: "covid_hospital_beds"
    },
    {
        label: "Admitted In DCH",
        key: "covid_hospital_admitted"
    },
    {
        label: "ICU Beds In DCH",
        key: "covid_hospital_icu_beds"
    },
    {
        label: "ICU Occupied In DCH",
        key: "covid_hospitals_icu_bed_occupied"
    },
    {
        label: "O2 Beds In DCH",
        key: "covid_hospital_o2_beds"
    },
    {
        label: "O2 Bed Occupied In DCH",
        key: "covid_hospital_o2_bed_occupied"
    },
    {
        label: "Non-O2 Bed In DCH",
        key: "covid_hospital_non_o2_beds"
    },
    {
        label: "Non-O2 Bed Occupied In DCH",
        key: "covid_hospital_non_o2_bed_occupied"
    },
    {
        label: "DCHC",
        key: "dchc"
    },
    {
        label: "Beds In DCHC",
        key: "dchc_beds"
    },
    {
        label: "Admitted In DCHC",
        key: "dchc_admitted"
    },
    {
        label: "ICU Beds In DCHC",
        key: "dchc_icu_beds"
    },
    {
        label: "ICU Beds Occupied In DCHC",
        key: "dchc_icu_beds_occupied"
    },
    {
        label: "O2 Beds In DCHC",
        key: "dchc_o2_beds"
    },
    {
        label: "O2 Beds Occupied In DCHC",
        key: "dchc_o2_occupied"
    },
    {
        label: "Non-O2 Beds In DCHC",
        key: "dchc_non_o2_beds"
    },
    {
        label: "Non-O2 Beds Occupied In DCHC",
        key: "dchc_non_o2_beds_occupied"
    },
    {
        label: "COVID Care Centres",
        key: "ccc"
    },
    {
        label: "Bed In COVID Care Centres",
        key: "ccc_beds"
    },
    {
        label: "Admitted In COVID Care Centres",
        key: "ccc_admitted"
    },
    {
        label: "O2 Beds In CCC",
        key: "ccc_o2_beds"
    },
    {
        label: "O2 Beds Occupied In CCC",
        key: "ccc_o2_occupied"
    },
    {
        label: "Non-O2 Beds In CCC",
        key: "ccc_non_o2_beds"
    },
    {
        label: "Non-O2 Beds Occupied In CCC",
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

export default class DistrictCovidReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // columns: [
            //     {
            //         label: "Date",
            //         prop: "date",
            //         width: 190,
            //         fixed: 'left',
            //         sortable: true,
            //         render: function (data) {
            //             return (
            //                 <span>
            //                     <Icon name='time' />
            //                     <span style={{ marginLeft: '10px' }}>{format(new Date(data.date), 'dd-MM-YYY HH:MM:SS')}</span>
            //                 </span>)
            //         }
            //     },
            //     {
            //         label: "Name",
            //         prop: "name",
            //         width: 180,
            //         sortable: true,
            //         fixed: 'left'
            //     },
            //     {
            //         label: "Check Gate Tested",
            //         width: 170,
            //         prop: "check_gate_tested"
            //     },
            //     {
            //         label: "Health Facility Tested",
            //         width: 180,
            //         prop: "health_facilities_tested",
            //     },
            //     {
            //         label: "Persons Tested Today",
            //         width: 130,
            //         prop: "tested"
            //     },
            //     {
            //         label: "Cumulative Persons Tested",
            //         width: 230,
            //         prop: "cumulative_tested"
            //     },
            //     {
            //         label: "Negative Cases Today",
            //         width: 190,
            //         prop: "tested_negative"
            //     },
            //     {
            //         label: "Positive Cases Today",
            //         width: 190,
            //         prop: "tested_positive"
            //     },
            //     {
            //         label: "Cumulative Positive Cases Till Date",
            //         width: 230,
            //         prop: "cumulative_positive"
            //     },
            //     {
            //         label: "Cured/ Discharged Today",
            //         width: 130,
            //         prop: "cured"
            //     },
            //     {
            //         label: "Cumulative Cured/ Discharged Till Date",
            //         width: 230,
            //         prop: "cumulative_cured"
            //     },
            //     {
            //         label: "Active Cases Today",
            //         width: 130,
            //         prop: "active_case"
            //     },
            //     {
            //         label: "Death Today",
            //         width: 130,
            //         prop: "death"
            //     },
            //     {
            //         label: "Cumulative Deaths Till Date",
            //         width: 230,
            //         prop: "cumulative_deaths"
            //     },
            //     {
            //         label: "DCH",
            //         width: 130,
            //         prop: "covid_hospitals"
            //     },
            //     {
            //         label: "DCH Beds",
            //         width: 130,
            //         prop: "covid_hospital_beds"
            //     },
            //     {
            //         label: "DCH Admitted",
            //         width: 150,
            //         prop: "covid_hospital_admitted"
            //     },
            //     {
            //         label: "DCH ICU Beds",
            //         width: 130,
            //         prop: "covid_hospital_icu_beds"
            //     },
            //     {
            //         label: "DCH ICU Beds Occupied",
            //         width: 210,
            //         prop: "covid_hospitals_icu_bed_occupied"
            //     },
            //     {
            //         label: "DCH O2 Beds",
            //         width: 130,
            //         prop: "covid_hospital_o2_beds"
            //     },
            //     {
            //         label: "DCH O2 Beds Occupied",
            //         width: 210,
            //         prop: "covid_hospital_o2_bed_occupied"
            //     },
            //     {
            //         label: "DCH Non-O2 Beds",
            //         width: 180,
            //         prop: "covid_hospital_non_o2_beds"
            //     },
            //     {
            //         label: "DCH Non-O2 Beds Occupied",
            //         width: 230,
            //         prop: "covid_hospital_non_o2_bed_occupied"
            //     },
            //     {
            //         label: "No. Of. DCHC",
            //         width: 150,
            //         prop: "dchc"
            //     },
            //     {
            //         label: "DCHC Beds",
            //         width: 150,
            //         prop: "dchc_beds"
            //     },
            //     {
            //         label: "DCHC Admitted",
            //         width: 150,
            //         prop: "dchc_admitted"
            //     },
            //     {
            //         label: "DCHC ICU Beds",
            //         width: 150,
            //         prop: "dchc_icu_beds"
            //     },
            //     {
            //         label: "DCHC ICU Beds Occupied",
            //         width: 230,
            //         prop: "dchc_icu_beds_occupied"
            //     },
            //     {
            //         label: "DCHC O2 Beds",
            //         width: 240,
            //         prop: "dchc_o2_beds"
            //     },
            //     {
            //         label: "DCHC O2 Beds Occupied",
            //         width: 210,
            //         prop: "dchc_o2_occupied"
            //     },
            //     {
            //         label: "DCHC Non-O2 Beds",
            //         width: 190,
            //         prop: "dchc_non_o2_beds"
            //     },
            //     {
            //         label: "DCHC Non-O2 Beds Occupied",
            //         width: 250,
            //         prop: "dchc_non_o2_beds_occupied"
            //     },
            //     {
            //         label: "CCC",
            //         width: 150,
            //         prop: "ccc"
            //     },
            //     {
            //         label: "CCC Beds",
            //         width: 150,
            //         prop: "ccc_beds"
            //     },
            //     {
            //         label: "CCC Admitted",
            //         width: 150,
            //         prop: "ccc_admitted"
            //     },
            //     {
            //         label: "CCC O2 Beds",
            //         width: 150,
            //         prop: "ccc_o2_beds"
            //     },
            //     {
            //         label: "CCC O2 Occupied",
            //         width: 150,
            //         prop: "ccc_o2_occupied"
            //     },
            //     {
            //         label: "CCC Non-O2 Beds",
            //         width: 150,
            //         prop: "ccc_non_o2_beds"
            //     },
            //     {
            //         label: "CCC Non-O2 Beds Occupied",
            //         width: 170,
            //         prop: "ccc_non_o2_occupied"
            //     },
            //     {
            //         label: "Home Isolation",
            //         width: 150,
            //         prop: "home_isolation"
            //     },
            //     {
            //         label: "FLW 1st Dose Recevied",
            //         width: 190,
            //         prop: "flw_1st_dose_received"
            //     },
            //     {
            //         label: "FLW Fully Inoculated",
            //         width: 190,
            //         prop: "flw_fully_inoculated"
            //     },
            //     {
            //         label: "HCW 1st Dose Recevied",
            //         width: 190,
            //         prop: "hcw_1st_dose_received"
            //     },
            //     {
            //         label: "HCW Fully Inoculated",
            //         width: 190,
            //         prop: "hcw_fully_inoculated"
            //     },
            //     {
            //         label: "45+ Year 1st Dose",
            //         width: 190,
            //         prop: "45years_1st_dose_received"
            //     },
            //     {
            //         label: "45+ Year Fully Inoculated",
            //         width: 190,
            //         prop: "45years_fully_inoculated"
            //     },
            //     {
            //         label: "18 TO 44 Year Recived 1st Dose",
            //         width: 190,
            //         prop: "18_to_44years_received_1st_dose"
            //     },
            //     {
            //         label: "18 TO 44 Year Fully Inoculated",
            //         width: 190,
            //         prop: "18_to_44years_fully_inoculated"
            //     },
            //     {
            //         label: "Total recived 1st Dose",
            //         width: 150,
            //         prop: "total_received_1st_dose"
            //     },
            //     {
            //         label: "Total Fully Inoculated",
            //         width: 150,
            //         prop: "total_fully_inoculated"
            //     },
            //     {
            //         label: "FIne Imposed For Not Following COVID Rule",
            //         width: 190,
            //         prop: "fine_imposed_today"
            //     },
            //     {
            //         label: "Cumulative Amount Of Fine Imposed For Not Following COVID Rule",
            //         width: 190,
            //         prop: "cumulative_fine_imposed"
            //     },
            //     {
            //         label: "Violations Reported For Not Following COVID Rule",
            //         width: 190,
            //         prop: "violations_reported_today"
            //     },
            //     {
            //         label: "Cumulative Violations Reported For Not Following COVID Rule",
            //         width: 190,
            //         prop: "cumulative_violations_reported"
            //     }
            // ],

            columns: [
                {
                    label: "Date",
                    prop: "date",
                    width: 190,
                    fixed: 'left',
                    sortable: true,
                    render: function (data) {
                        return (
                            <span>
                                <Icon name='time' />
                                <span style={{ marginLeft: '10px' }}>{format(new Date(data.date), 'dd-MM-YYY HH:MM:SS')}</span>
                            </span>)
                    }
                },
                {
                    label: "Name",
                    prop: "name",
                    width: 180,
                    sortable: true,
                    fixed: 'left'
                },
                {
                    label: "Tested At Check Gates",
                    width: 170,
                    prop: "check_gate_tested"
                },
                {
                    label: "Tested At Flu Clinics/ Health Facilities",
                    width: 180,
                    prop: "health_facilities_tested",
                },
                {
                    label: "Persons Tested Today",
                    width: 130,
                    prop: "tested"
                },
                {
                    label: "Cumulative Persons Tested",
                    width: 230,
                    prop: "cumulative_tested"
                },
                {
                    label: "Negative Cases Today",
                    width: 190,
                    prop: "tested_negative"
                },
                {
                    label: "Positive Cases Today",
                    width: 190,
                    prop: "tested_positive"
                },
                {
                    label: "Cumulative Positive Cases",
                    width: 230,
                    prop: "cumulative_positive"
                },
                {
                    label: "Cured/ Discharged Today",
                    width: 130,
                    prop: "cured"
                },
                {
                    label: "Cumulative Cured/ Discharged",
                    width: 230,
                    prop: "cumulative_cured"
                },
                {
                    label: "Active Cases Today",
                    width: 130,
                    prop: "active_case"
                },
                {
                    label: "Deceased Today",
                    width: 130,
                    prop: "death"
                },
                {
                    label: "Cumulative Deceased",
                    width: 230,
                    prop: "cumulative_deaths"
                },
                {
                    label: "DCH",
                    width: 130,
                    prop: "covid_hospitals"
                },
                {
                    label: "Beds In DCH",
                    width: 130,
                    prop: "covid_hospital_beds"
                },
                {
                    label: "Admitted In DCH",
                    width: 150,
                    prop: "covid_hospital_admitted"
                },
                {
                    label: "ICU Beds In DCH",
                    width: 130,
                    prop: "covid_hospital_icu_beds"
                },
                {
                    label: "ICU Occupied In DCH",
                    width: 210,
                    prop: "covid_hospitals_icu_bed_occupied"
                },
                {
                    label: "O2 Beds In DCH",
                    width: 130,
                    prop: "covid_hospital_o2_beds"
                },
                {
                    label: "O2 Bed Occupied In DCH",
                    width: 210,
                    prop: "covid_hospital_o2_bed_occupied"
                },
                {
                    label: "Non-O2 Bed In DCH",
                    width: 180,
                    prop: "covid_hospital_non_o2_beds"
                },
                {
                    label: "Non-O2 Bed Occupied In DCH",
                    width: 230,
                    prop: "covid_hospital_non_o2_bed_occupied"
                },
                {
                    label: "DCHC",
                    width: 150,
                    prop: "dchc"
                },
                {
                    label: "Beds In DCHC",
                    width: 150,
                    prop: "dchc_beds"
                },
                {
                    label: "Admitted In DCHC",
                    width: 150,
                    prop: "dchc_admitted"
                },
                {
                    label: "ICU Beds In DCHC",
                    width: 150,
                    prop: "dchc_icu_beds"
                },
                {
                    label: "ICU Beds Occupied In DCHC",
                    width: 230,
                    prop: "dchc_icu_beds_occupied"
                },
                {
                    label: "O2 Beds In DCHC",
                    width: 240,
                    prop: "dchc_o2_beds"
                },
                {
                    label: "O2 Beds Occupied In DCHC",
                    width: 210,
                    prop: "dchc_o2_occupied"
                },
                {
                    label: "Non-O2 Beds In DCHC",
                    width: 190,
                    prop: "dchc_non_o2_beds"
                },
                {
                    label: "Non-O2 Beds Occupied In DCHC",
                    width: 250,
                    prop: "dchc_non_o2_beds_occupied"
                },
                {
                    label: "COVID Care Centres",
                    width: 150,
                    prop: "ccc"
                },
                {
                    label: "Bed In COVID Care Centres",
                    width: 150,
                    prop: "ccc_beds"
                },
                {
                    label: "Admitted In COVID Care Centres",
                    width: 150,
                    prop: "ccc_admitted"
                },
                {
                    label: "O2 Beds In CCC",
                    width: 150,
                    prop: "ccc_o2_beds"
                },
                {
                    label: "O2 Beds Occupied In CCC",
                    width: 150,
                    prop: "ccc_o2_occupied"
                },
                {
                    label: "Non-O2 Beds In CCC",
                    width: 150,
                    prop: "ccc_non_o2_beds"
                },
                {
                    label: "Non-O2 Beds Occupied In CCC",
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
            statusType: [{ 'id': 1, 'name': 'Approved', 'key': 'true' }, { 'id': 2, 'name': 'Pending', 'key': 'false' }],
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
    }

    currentStatusData = async (data, date1, date2) => {
        const status = data || 'null';
        const start = date1 || 'null';
        const end = date2 || 'null';
        // console.log(status, start, end);

        if (!this.Auth.isTokenExpired) {
            this.Auth.logout()
        } else {
            try {
                this.setState({ loading: true });

                await fetch(`${process.env.REACT_APP_URL}/admin/districtReportsview?district=${localStorage.getItem('name')}&date1=${start}&date2=${end}&status=${status}`, {
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

    onStatusChangeHandler(data) {
        var date1, date2,
            district = data;
        this.setState({ value: data });
        if (data === '') {
            district = 'null';
        }
        if (this.state.datevalue != null) {
            //   date = format(this.state.datevalue, 'yyyy-MM-dd');
            date1 = dateFormat(this.state.datevalue[0], "isoDate");
            date2 = dateFormat(this.state.datevalue[1], "isoDate");
        }
        // console.log(district, date1, date2);
        // this.report(district, date);
        this.currentStatusData(district, date1, date2);
    }


    onDatechangeHandler(data) {

        var date1, date2,
            district = this.state.value;
        if (district === '') {
            // district = this.setState.value;
            district = 'null';
        }
        if (data != null) {
            // date = format(data, 'yyyy-MM-dd');
            date1 = dateFormat(data[0], "isoDate");
            date2 = dateFormat(data[1], "isoDate");
        }
        this.currentStatusData(district, date1, date2);
    }

    onSizeChange = (size) => {
        this.setState({ loading: true })
        // console.log('onChange:size=', size);
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
        // console.log('onChange:current=', current);
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
        return (
            <Fragment>
                <div className='citizen_titile_section'>
                    <div className='body_title'>
                        <p>District Uploaded Report</p>
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
                        placeholder='Select Status'
                        onChange={this.onStatusChangeHandler.bind(this)}
                        clearable={true}
                    >
                        {this.state.statusType.map((el) => {
                            return (
                                <Select.Option
                                    filterable={true}
                                    key={el.id}
                                    label={el.name}
                                    value={el.key}
                                />
                            );
                        })}
                    </Select>

                    {/* select date  */}
                    {/* <DatePicker
                        value={datevalue}
                        placeholder='Pick a day'
                        onChange={(date) => {
                            console.debug('DatePicker1 changed: ', date);
                            this.setState({ datevalue: date });
                            this.onDatechangeHandler(date);
                        }}
                    /> */}

                    <DateRangePicker
                        value={datevalue}
                        placeholder="Pick a range"
                        onChange={date => {
                            // console.debug('DateRangePicker1 changed: ', date)
                            this.setState({ datevalue: date })
                            this.onDatechangeHandler(date);
                        }}
                    />
                    <button className="btn btn_cat_csv">
                        <CSVLink filename={`District Uploaded Report ${Date.now()}.csv`} data={this.state.data} headers={headers}>Download CSV
                            <i className="fas fa-file-csv exe_csv"></i>
                        </CSVLink>
                    </button>
                </div>
                <div className='citizen_body_section'>
                    {length === 0 ? (
                        // <div className="container user_not_found">
                        //     <i className="fas fa-users user_ico"></i>
                        //     <p>Waiting For the Data</p>
                        // </div>
                        <UserNotFound />
                    ) : (
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
        )
    }
}

const UserNotFound = () => {
    return (
        <div className="container user_not_found">
            <i className="fas fa-users user_ico"></i>
            <p>No Record Found</p>
        </div>
    )
}