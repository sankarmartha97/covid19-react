import React, { Component, Fragment } from 'react';
import { Select, Form, Input, Button, DatePicker, MessageBox, Message } from 'element-react';
import 'element-theme-default';
import { i18n } from 'element-react';
import locale from 'element-react/src/locale/lang/en';
import DashboardCurrentStatus from './dashboard_status.component';
i18n.use(locale);

export default class DashboardUpdation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        // confirmed_cases: '',
        // quarantine_cases: '',
        // district: '',
        // recovered_cases: '',
        // deceased_cases: '',
        // citizen_screened: '',
        // suspected_cases: '',
        // sample_collected: '',
        // negative_cases: '',
        // positive_cases: '',
        // result_awaited: '',
        // isolation_cases: [],
        active_cases: '',
        date: null,
        tested_at_check_gate_today: '',
        tested_at_health_facilities_today: "",
        person_tested_today: '',
        tested_till_date: '',
        person_tested_negative_today: '',
        person_tested_positive_today: '',
        positive_till_date: '',
        curd: '',
        curd_till_date: '',
        deceased_cases: '',
        deceased_cases_till_date: '',
        dch_hospttals: '',
        dch_bed: '',
        dch_admitted: '',
        dch_icu: '',
        dch_icu_occupied: '',
        dch_o2_beds: '',
        dch_o2_bed_occupied: '',
        dch_non_o2_bed: '',
        dchc_non_o2_bed_occuiped: '',
        dchc: '',
        dchc_bed: '',
        dchc_admitted: '',
        dchc_icu_bed: '',
        dchc_icu_bed_occupied: '',
        dchc_o2_bed: '',
        dchc_o2_bed_occupied: '',
        dchc_non_o2_bed: '',
        dchc_non_o2_bed_occuiped: '',
        ccc: '',
        ccc_bed: '',
        ccc_admitted: '',
        ccc_o2_bed: '',
        ccc_o2_bed_occupied: '',
        ccc_non_o2_bed: '',
        home_isolation: '',
        flws_first_dose_recived: '',
        flws_fully_inoculated: '',
        hcws_first_dose_recived: '',
        hcws_fully_inoculated: '',
        fully_inoculated_recived_45years: '',
        fully_inoclat_recived_18_to_44years: '',
        first_dose_recived_18_to_44years:'',
        registered_for_vaccination: '',
        total_first_dose_received: '',
        total_fully_inoculated: '',
        violations_reported_today:'',
        cumulative_violations_reported: '',
        fine_imposed_today: '',
        cumulative_fine_imposed: '',
      },
      rules: {
        date: [
          {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
          },
        ],
        tested_at_check_gate_today: [
          {
            required: true,
            message: 'Please input Check Gate Tested Cases',
            trigger: 'blur',
          },
        ],
        tested_at_health_facilities_today: [
          {
            required: true,
            message: 'Please input Health Facilities Tested',
            trigger: 'blur',
          },
        ],
        person_tested_today: [
          {
            required: true,
            message: 'Please input Person Tested Today',
            trigger: 'blur',
          },
        ],
        tested_till_date: [
          {
            required: true,
            message: 'Please input Person Tested Till date',
            trigger: 'blur',
          },
        ],
        person_tested_negative_today: [
          {
            required: true,
            message: 'Please input Tested Negative Today',
            trigger: 'blur',
          },
        ],
        person_tested_positive_today: [
          {
            required: true,
            message: 'Please input Positive Cases Today',
            trigger: 'blur',
          },
        ],
        positive_till_date: [
          {
            required: true,
            message: 'Please input Positive Cases Till date',
            trigger: 'blur',
          },
        ],
        curd: [
          {
            required: true,
            message: 'Please input Curd',
            trigger: 'blur',
          },
        ],
        curd_till_date: [
          {
            required: true,
            message: 'Please input Total Curd Till date',
            trigger: 'blur',
          },
        ],
        deceased_cases: [
          {
            required: true,
            message: 'Please input Deaths',
            trigger: 'blur',
          },
        ],
        deceased_cases_till_date: [
          {
            required: true,
            message: 'Please input Deaths till date',
            trigger: 'blur',
          },
        ],
        active_cases: [
          {
            required: true,
            message: 'Please input Active Cases',
            trigger: 'blur',
          },
        ],
        dch_hospttals: [
          {
            required: true,
            message: 'Please input No.of DCH Hospitals',
            trigger: 'blur',
          },
        ],
        dch_bed: [
          {
            required: true,
            message: 'Please input Beds in DCH Hospital',
            trigger: 'change',
          },
        ],
        dch_admitted: [
          {
            required: true,
            message: 'Please input No of person admitted in DCH Hospital',
            trigger: 'change',
          },
        ],
        dch_icu: [
          {
            required: true,
            message: 'Please input No Of ICU Beds in DCH Hospital',
            trigger: 'change',
          },
        ],
        dch_icu_occupied: [
          {
            required: true,
            message: 'Please input No Of ICU Bed Occupied in DCH Hospital',
            trigger: 'change',
          },
        ],
        dch_o2_beds: [
          {
            required: true,
            message: 'Please input No Of Oxigen Beds in DCH Hospital',
            trigger: 'change',
          },
        ],
        dch_o2_bed_occupied: [
          {
            required: true,
            message: 'Please input No Of Oxigen Bed Occupied in DCH Hospital',
            trigger: 'change',
          },
        ],
        dch_non_o2_bed: [
          {
            required: true,
            message: 'Please input No Of Non-Oxigen Beds in DCH Hospital',
            trigger: 'change',  
          },
        ],
        dch_non_o2_bed_occupied: [
          {
            required: true,
            message: 'Please input No Of Non-Oxigen Beds Occupied in DCH Hospital',
            trigger: 'change',
          },
        ],
        dchc: [
          {
            required: true,
            message: 'Please input No Of DCHC Hospital',
            trigger: 'change',
          },
        ],
        dchc_bed: [
          {
            required: true,
            message: 'Please input NO.Of Beds in DCHC Hospital',
            trigger: 'change',
          },
        ],
        dchc_admitted: [
          {
            required: true,
            message: 'Please input No Of Admitted DCHC Hospital',
            trigger: 'change',
          },
        ],
        dchc_icu_bed: [
          {
            required: true,
            message: 'Please input NO.Of ICU Beds in DCHC Hospital',
            trigger: 'change',
          },
        ],
        dchc_icu_bed_occupied: [
          {
            required: true,
            message: 'Please input No Of ICU Beds Occupied DCHC Hospital',
            trigger: 'change',
          },
        ],
        dchc_o2_bed: [
          {
            required: true,
            message: 'Please input NO.Of Oxigen Beds in DCHC Hospital',
            trigger: 'change',
          },
        ],
        dchc_o2_bed_occupied: [
          {
            required: true,
            message: 'Please input No Of ICU Beds Occupied DCHC Hospital',
            trigger: 'change',
          },
        ],
        dchc_non_o2_bed: [
          {
            required: true,
            message: 'Please input NO.Of Non-Oxigen Beds in DCHC Hospital',
            trigger: 'change',
          },
        ],        
        dchc_non_o2_bed_occuiped: [
          {
            required: true,
            message: 'Please input No Of Non-Oxigen Beds DCHC Hospital',
            trigger: 'change',
          },
        ],
        ccc: [
          {
            required: true,
            message: 'Please input NO.Of CCC Hospital',
            trigger: 'change',
          },
        ],        
        ccc_bed: [
          {
            required: true,
            message: 'Please input No Of Beds CCC Hospital',
            trigger: 'change',
          },
        ],
        ccc_admitted: [
          {
            required: true,
            message: 'Please input NO.Of Person Admitted in CCC Hospital',
            trigger: 'change',
          },
        ],        
        ccc_o2_bed: [
          {
            required: true,
            message: 'Please input No Of Oxigen Beds CCC Hospital',
            trigger: 'change',
          },
        ],
        ccc_o2_bed_occupied: [
          {
            required: true,
            message: 'Please input NO.Of Oxigen Beds Occupied in CCC Hospital',
            trigger: 'change',
          },
        ],        
        ccc_non_o2_bed: [
          {
            required: true,
            message: 'Please input NO.Of Non-Oxigen Beds CCC Hospital',
            trigger: 'change',
          },
        ],
        ccc_non_o2_bed: [
          {
            required: true,
            message: 'Please input NO.Of Non-Oxigen Beds Occupied in CCC Hospital',
            trigger: 'change',
          },
        ],   
        ccc_non_o2_bed_occuiped: [
          {
            required: true,
            message: 'Please input NO.Of Non-Oxigen Beds Occupied in CCC Hospital',
            trigger: 'change',
          },
        ],     
        home_isolation: [
          {
            required: true,
            message: 'Please input No Of Home Isolation',
            trigger: 'change',
          },
        ],
        flws_first_dose_recived: [
          {
            required: true,
            message: 'Please input 1st Dose Recived',
            trigger: 'change',
          },
        ],        
        flws_fully_inoculated: [
          {
            required: true,
            message: 'Please input FLWS Fully Inoculated',
            trigger: 'change',
          },
        ],
        hcws_first_dose_recived: [
          {
            required: true,
            message: 'Please input Hcws First Dose',
            trigger: 'change',
          },
        ],       
        hcws_fully_inoculated: [
          {
            required: true,
            message: 'Please input HCWS fully Inoculated',
            trigger: 'change',
          },
        ],
        fully_inoculated_recived_45years: [
          {
            required: true,
            message: 'Please input Fully Inoculated Recived 45+ Years',
            trigger: 'change',
          },
        ],
        fully_inoclat_recived_18_to_44years: [
          {
            required: true,
            message: 'Please input Fully Inoculated Recived 18 to 44 Years',
            trigger: 'change',
          },
        ],
        first_dose_recived_45years: [
          {
            required: true,
            message: 'Please input First Dose Recived 45+ Years',
            trigger: 'change',
          },
        ],
        first_dose_recived_18_to_44years: [
          {
            required: true,
            message: 'Please input Fully Inoculated Recived 18 to 44 Years',
            trigger: 'change',
          },
        ],

        total_first_dose_received: [
          {
            required: true,
            message: 'Please input Total First Dose Received',
            trigger: 'change',
          },
        ],
        total_fully_inoculated: [
          {
            required: true,
            message: 'Please input Total Fully Inoculated',
            trigger: 'change',
          },
        ],
        violations_reported_today:[
          {
            required: true,
            message: 'Please input violations reported Today for not following Covid Appropriate Behaviour',
            trigger: 'change',
          }
        ],
        cumulative_violations_reported:[
          {
            required: true,
            message: 'Please input cumulative violations report for not following Covid Appropriate Behaviour',
            trigger: 'change',
          }
        ],
        fine_imposed_today: [
          {
            required: true,
            message: 'Please input fine imposed today not following Covid Appropriate Behaviour',
            trigger: 'change',
          }
        ],
        cumulative_fine_imposed: [
          {
            required: true,
            message: 'Cumulative amount of fine imposed for not following Covid Appropriate Behaviour (in Rs.) w.e.f. 01/04/2020 till date',
            trigger: 'change',
          }
        ]
      },
      data: [],
      update_data: [],
      loading: false
    };
  }

  componentDidMount() {
    // fetch(`${process.env.REACT_APP_URL}/districtlist`)
    //   .then((res) => res.json())
    //   .then((data) => this.setState({ data }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true })
    this.refs.form.validate((valid) => {
      if (valid) {
        this.updatedata();
      } else {
        // console.log('error submit!!');
        this.setState({ loading: false });
        MessageBox.alert('Please fill required fields', 'Warning', {
          type: 'warning'});
        return false;
      }
    });
  }

  updatedata() {
    // const district = this.state.form.district;
    // const confirmed = this.state.form.positive_cases;
    // const quarantined = this.state.form.quarantine_cases;
    // const recovered = this.state.form.recovered_cases;
    // const deceased = this.state.form.deceased_cases;
    // const screened = this.state.form.citizen_screened;
    // const suspected = this.state.form.suspected_cases;
    // const sampleCollected = this.state.form.sample_collected;
    // const resultAwaited = this.state.form.result_awaited;
    // const isolation = this.state.form.isolation_cases;
    // const negative = this.state.form.negative_cases;
    const active = this.state.form.active_cases;
    const date = this.state.form.date;
    const checkGateTested = this.state.form.tested_at_check_gate_today;
    const healthFacilitiesTested = this.state.form.tested_at_health_facilities_today;
    const testedToday = this.state.form.person_tested_today;
    const testedTillDate = this.state.form.tested_till_date;
    const testedNegativeToday = this.state.form.person_tested_negative_today;
    const testedPositiveToday = this.state.form.person_tested_positive_today;
    const positive = this.state.form.positive_till_date;
    const curd = this.state.form.curd;
    const curdTillDate = this.state.form.curd_till_date;
    const death = this.state.form.deceased_cases;
    const deathTillDate = this.state.form.deceased_cases_till_date;
    const dch = this.state.form.dch_hospttals;
    const dchBed = this.state.form.dch_bed;
    const dchAdmitted = this.state.form.dch_admitted;
    const dchIcu = this.state.form.dch_icu;
    const dchIcuOccupied = this.state.form.dch_icu_occupied;
    const dchO2bed = this.state.form.dch_o2_beds;
    const dchO2bedOccupied = this.state.form.dch_o2_bed_occupied;
    const dchNonO2beds = this.state.form.dch_non_o2_bed;
    const dchNonO2bedsOccupied = this.state.form.dchc_non_o2_bed_occuiped;
    const dchc = this.state.form.dchc;
    const dchcBed = this.state.form.dchc_bed;
    const dchcAdmitted = this.state.form.dchc_admitted;
    const dchcIcuBed = this.state.form.dchc_icu_bed;
    const dchcIcuBedOccupied = this.state.form.dchc_icu_bed_occupied;
    const dchcO2Bed = this.state.form.dchc_o2_bed;
    const dchcO2bedOccupied = this.state.form.dchc_o2_bed_occupied;
    const dchcNonO2Bed = this.state.form.dchc_non_o2_bed;
    const dchcNonO2BedOccupied = this.state.form.dchc_non_o2_bed_occuiped;
    const ccc = this.state.form.ccc;
    const cccBed = this.state.form.ccc_bed;
    const cccAdmitted = this.state.form.ccc_admitted;
    const cccO2Bed = this.state.form.ccc_o2_bed;
    const cccO2bedOccupied = this.state.form.ccc_o2_bed_occupied;
    const cccNonO2Bed = this.state.form.ccc_non_o2_bed;
    const cccNonO2BedOccupied = this.state.form.ccc_non_o2_bed_occuiped;
    const homeIsolation = this.state.form.home_isolation;
    // const flwsFistDoseRicived = this.state.form.flws_first_dose_recived;
    // const flwsFulyInoculated = this.state.form.flws_fully_inoculated;
    // const hcwsFistDoseRicived = this.state.form.hcws_first_dose_recived;
    // const hcwsFullyInoculated = this.state.form.hcws_fully_inoculated;
    // const fistDoseReceivedaboub45year = this.state.form.first_dose_recived_45years;
    // const fullyInoculatedAboub45year = this.state.form.fully_inoculated_recived_45years;
    // const fistDoseReceived18and45 = this.state.form.first_dose_recived_18_to_44years;
    // const fullyInoculated18and45 = this.state.form.fully_inoclat_recived_18_to_44years;
    // const registorForVaccination = this.state.form.registered_for_vaccination;
    const totalFastDoseRecived = this.state.form.total_first_dose_received;
    const totalFullyIncolated = this.state.form.total_fully_inoculated;
    const violations_reported_today = this.state.form.violations_reported_today;
    const cumulative_violations_reported = this.state.form.cumulative_violations_reported;
    const fine_imposed_today = this.state.form.fine_imposed_today;
    const cumulative_fine_imposed = this.state.form.cumulative_fine_imposed;
    const key = localStorage.getItem('key');
    const query = localStorage.getItem('request');

    const user = localStorage.getItem('id');
    fetch(`${process.env.REACT_APP_URL}/status/createupdate`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'authorization': sessionStorage.getItem('token'),
        // 'key': localStorage.getItem('key'),
        // 'reqid': localStorage.getItem('request'),
      },
      body: JSON.stringify({
        // user,
        key,
        query,
        // district,
        // confirmed,
        // recovered,
        // active,
        // deceased,
        // quarantined,
        // date,
        // screened,
        // suspected,
        // sampleCollected,
        // negative,
        // resultAwaited,
        // isolation,
        active,
        date,
        checkGateTested,
        healthFacilitiesTested,
        testedToday,
        testedTillDate,
        testedNegativeToday,
        testedPositiveToday,
        positive,
        curd,
        curdTillDate,
        death,
        deathTillDate,
        dch,
        dchBed,
        dchAdmitted,
        dchIcu,
        dchIcuOccupied,
        dchO2bed,
        dchO2bedOccupied,
        dchNonO2beds,
        dchNonO2bedsOccupied,
        dchc,
        dchcBed,
        dchcAdmitted,
        dchcIcuBed,
        dchcIcuBedOccupied,
        dchcO2Bed,
        dchcO2bedOccupied,
        dchcNonO2Bed,
        dchcNonO2BedOccupied,
        ccc,
        cccBed,
        cccAdmitted,
        cccO2Bed,
        cccO2bedOccupied,
        cccNonO2Bed,
        cccNonO2BedOccupied,
        homeIsolation,
        // flwsFistDoseRicived,
        // flwsFulyInoculated,
        // hcwsFistDoseRicived,
        // hcwsFistDoseRicived,
        // hcwsFullyInoculated,
        // fistDoseReceivedaboub45year,
        // fullyInoculatedAboub45year,
        // fistDoseReceived18and45,
        // fullyInoculated18and45,
        // registorForVaccination,
        totalFastDoseRecived,
        totalFullyIncolated,
        violations_reported_today,
        cumulative_violations_reported,
        fine_imposed_today,
        cumulative_fine_imposed
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        MessageBox.alert(`${res.message}`, 'Success', {
          confirmButtonText: 'OK',
          type: 'success',
        })
          .then(() => {
            window.location.reload(true);
          })
          .catch(() => {
            window.location.reload(true);
          });
      });
  }

  handleReset(e) {
    e.preventDefault();
    this.setState({ loading: false })
    this.refs.form.resetFields();
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value }),
    });
    this.setState({ loading: false })
  }

  // render main component
  render() {
    return (
      <Fragment>
        <div className='row dashboard_updation_wrapper'>
          <div className='col-md-6 col-lg-6 dashboard_updation_form'>
            <Form
              ref='form'
              className='en-US'
              model={this.state.form}
              rules={this.state.rules}
              labelWidth='200'
            >
              {/* Select district */}
              {/* <Form.Item label='Select District' prop='district'>
                <Select
                  value={this.state.form.district}
                  placeholder='District'
                  onChange={this.onChange.bind(this, 'district')}
                  clearable={true}
                >
                  {this.state.data.map((el) => {
                    return (
                      <Select.Option
                        key={el.id}
                        label={el.name}
                        value={el.name}
                      />
                    );
                  })}
                </Select>
              </Form.Item> */}

              <Form.Item label='Select Date' prop='date'>
                <DatePicker
                  value={this.state.form.date}
                  placeholder='Pick a date'
                  onChange={this.onChange.bind(this, 'date')}
                />
              </Form.Item>

              <Form.Item label='No. of Persons tested at Check Gates today' prop='tested_at_check_gate_today'>
                <Input
                  type='number'
                  value={this.state.form.tested_at_check_gate_today}
                  onChange={this.onChange.bind(this, 'tested_at_check_gate_today')}
                  autocomplete = "on"
                ></Input>
              </Form.Item>

              <Form.Item label='No. of Patients tested in FLUCLINICS/Health Facilities today' prop='tested_at_health_facilities_today'>
                <Input
                  type='number'
                  value={this.state.form.tested_at_health_facilities_today}
                  onChange={this.onChange.bind(this, 'tested_at_health_facilities_today')}
                ></Input>
              </Form.Item>

              <Form.Item label='No. of persons tested today' prop='tested_today' >
                <Input
                  type='number'
                  value={this.state.form.person_tested_today}
                  onChange={this.onChange.bind(this, 'person_tested_today')}
                ></Input>
              </Form.Item>

              <Form.Item label='Cumulative number of tests done w.e.f. 01/04/2020 till date ' prop='tested_till_date' >
                <Input
                  type='number'
                  value={this.state.form.tested_till_date}
                  onChange={this.onChange.bind(this, 'tested_till_date')}
                ></Input>
              </Form.Item>

              <Form.Item label='No. of persons tested negative today' props='person_tested_negative_today'>
                <Input
                  type='number'
                  value={this.state.form.person_tested_negative_today}
                  onChange={this.onChange.bind(this, 'person_tested_negative_today')}
                ></Input>
              </Form.Item>

              <Form.Item label='No. of persons tested positive today' prop='person_tested_positive_today'>
                <Input
                  type='number'
                  value={this.state.form.person_tested_positive_today}
                  onChange={this.onChange.bind(this, 'person_tested_positive_today')}
                ></Input>
              </Form.Item>

              <Form.Item label='Cumulative Positive Cases w.e.f.01/04/2020 till date' prop='positive_till_date'>
                <Input
                  type='number'
                  value={this.state.form.positive_till_date}
                  onChange={this.onChange.bind(this, 'positive_till_date')}
                ></Input>
              </Form.Item>

              <Form.Item label='No. of persons cured/discharged today' prop='curd'>
                <Input
                  type='number'
                  value={this.state.form.curd}
                  onChange={this.onChange.bind(this, 'curd')}
                ></Input>
              </Form.Item>

              <Form.Item label='Cumulative persons cured/discharged w.e.f.01/04/2020 till date' prop='curd_till_date'>
                <Input
                  type='number'
                  value={this.state.form.curd_till_date}
                  onChange={this.onChange.bind(this, 'curd_till_date')}
                ></Input>
              </Form.Item>

              <Form.Item label='Total Active cases as on today' prop = 'active_cases'>
                <Input
                  type='number'
                  value={this.state.form.active_cases}
                  onChange={this.onChange.bind(this, 'active_cases')}
                ></Input>
              </Form.Item>

              <Form.Item label='COVID-19 deaths today' prop='deceased_cases'>
                <Input
                  type='number'
                  value={this.state.form.deceased_cases}
                  onChange={this.onChange.bind(this, 'deceased_cases')}
                ></Input>
              </Form.Item>

              <Form.Item label='Cumulative number of COVID-19 Deaths w.e.f.01/04/2020 tilldate' prop='deceased_cases_till_date'>
                <Input
                  type='number'
                  value={this.state.form.deceased_cases_till_date}
                  onChange={this.onChange.bind(this, 'deceased_cases_till_date')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of Dedicated COVID Hospitals (DCH)' prop='dch_hospttals'>
                <Input
                  type='number'
                  value={this.state.form.dch_hospttals}
                  onChange={this.onChange.bind(this, 'dch_hospttals')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of beds in DCH' prop='dch_bed'>
                <Input
                  type='number'
                  value={this.state.form.dch_bed}
                  onChange={this.onChange.bind(this, 'dch_bed')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of persons currently admitted in DCH' prop='dch_admitted'>
                <Input
                  type='number'
                  value={this.state.form.dch_admitted}
                  onChange={this.onChange.bind(this, 'dch_admitted')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of ICU beds in DCH' prop='dch_icu'>
                <Input
                  type='number'
                  value={this.state.form.dch_icu}
                  onChange={this.onChange.bind(this, 'dch_icu')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of ICU beds occupied in DCH' prop='dch_icu_occupied'>
                <Input
                  type='number'
                  value={this.state.form.dch_icu_occupied}
                  onChange={this.onChange.bind(this, 'dch_icu_occupied')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of O2 beds in DCH' prop='dch_o2_beds'>
                <Input
                  type='number'
                  value={this.state.form.dch_o2_beds}
                  onChange={this.onChange.bind(this, 'dch_o2_beds')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of O2 beds occupied in DCH' prop='dch_o2_bed_occupied'>
                <Input
                  type='number'
                  value={this.state.form.dch_o2_bed_occupied}
                  onChange={this.onChange.bind(this, 'dch_o2_bed_occupied')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of Non-O2 beds in DCH' prop='dch_non_o2_bed'>
                <Input
                  type='number'
                  value={this.state.form.dch_non_o2_bed}
                  onChange={this.onChange.bind(this, 'dch_non_o2_bed')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of Non-O2 beds occupied in DCH' prop='dch_non_o2_bed_occupied'>
                <Input
                  type='number'
                  value={this.state.form.dch_non_o2_bed_occupied}
                  onChange={this.onChange.bind(this, 'dch_non_o2_bed_occupied')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of Dedicated COVID Health Centres (DCHC)' prop='dchc'>
                <Input
                  type='number'
                  value={this.state.form.dchc}
                  onChange={this.onChange.bind(this, 'dchc')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of beds in DCHC' prop='dchc_bed'>
                <Input
                  type='number'
                  value={this.state.form.dchc_bed}
                  onChange={this.onChange.bind(this, 'dchc_bed')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of persons currently admitted in DCHC' prop='dchc_admitted'>
                <Input
                  type='number'
                  value={this.state.form.dchc_admitted}
                  onChange={this.onChange.bind(this, 'dchc_admitted')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of ICU beds in DCHC' prop='dchc_icu_bed'>
                <Input
                  type='number'
                  value={this.state.form.dchc_icu_bed}
                  onChange={this.onChange.bind(this, 'dchc_icu_bed')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of ICU beds occupied in DCHC' prop='dchc_icu_bed_occupied'>
                <Input
                  type='number'
                  value={this.state.form.dchc_icu_bed_occupied}
                  onChange={this.onChange.bind(this, 'dchc_icu_bed_occupied')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of O2 beds in DCHC' prop='dchc_o2_bed'>
                <Input
                  type='number'
                  value={this.state.form.dchc_o2_bed}
                  onChange={this.onChange.bind(this, 'dchc_o2_bed')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of O2 beds occupied in DCHC' prop='dchc_o2_bed_occupied'>
                <Input
                  type='number'
                  value={this.state.form.dchc_o2_bed_occupied}
                  onChange={this.onChange.bind(this, 'dchc_o2_bed_occupied')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of Non-O2 beds in DCHC' prop='dchc_non_o2_bed'>
                <Input
                  type='number'
                  value={this.state.form.dchc_non_o2_bed}
                  onChange={this.onChange.bind(this, 'dchc_non_o2_bed')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of Non-O2 occupied beds in DCHC' prop='dchc_non_o2_bed_occuiped'>
                <Input
                  type='number'
                  value={this.state.form.dchc_non_o2_bed_occuiped}
                  onChange={this.onChange.bind(this, 'dchc_non_o2_bed_occuiped')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of COVID Care Centres (CCC)' prop='ccc'>
                <Input
                  type='number'
                  value={this.state.form.ccc}
                  onChange={this.onChange.bind(this, 'ccc')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of beds in CCC' prop='ccc_bed'>
                <Input
                  type='number'
                  value={this.state.form.ccc_bed}
                  onChange={this.onChange.bind(this, 'ccc_bed')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of persons currently admitted in CCC' prop='ccc_admitted'>
                <Input
                  type='number'
                  value={this.state.form.ccc_admitted}
                  onChange={this.onChange.bind(this, 'ccc_admitted')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of O2 beds in CCC' prop='ccc_o2_bed'>
                <Input
                  type='number'
                  value={this.state.form.ccc_o2_bed}
                  onChange={this.onChange.bind(this, 'ccc_o2_bed')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of O2 beds occupied in CCC' prop='ccc_o2_bed_occupied'>
                <Input
                  type='number'
                  value={this.state.form.ccc_o2_bed_occupied}
                  onChange={this.onChange.bind(this, 'ccc_o2_bed_occupied')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of Non-O2 beds in CCC' prop='ccc_non_o2_bed'>
                <Input
                  type='number'
                  value={this.state.form.ccc_non_o2_bed}
                  onChange={this.onChange.bind(this, 'ccc_non_o2_bed')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of Non-O2 beds occupied in CCC' prop='ccc_non_o2_bed_occuiped'>
                <Input
                  type='number'
                  value={this.state.form.ccc_non_o2_bed_occuiped}
                  onChange={this.onChange.bind(this, 'ccc_non_o2_bed_occuiped')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of persons currently under home isolation' prop='home_isolation'>
                <Input
                  type='number'
                  value={this.state.form.home_isolation}
                  onChange={this.onChange.bind(this, 'home_isolation')}
                ></Input>
              </Form.Item>

              {/* <Form.Item label='Number of FLWs received first dose for vaccination' prop='flws_first_dose_recived'>
                <Input
                  type='number'
                  value={this.state.form.flws_first_dose_recived}
                  onChange={this.onChange.bind(this, 'flws_first_dose_recived')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of FLWs fully inoculated' prop='flws_fully_inoculated'>
                <Input
                  type='number'
                  value={this.state.form.flws_fully_inoculated}
                  onChange={this.onChange.bind(this, 'flws_fully_inoculated')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of HCWs received first dose for vaccination' prop='hcws_first_dose_recived'>
                <Input
                  type='number'
                  value={this.state.form.hcws_first_dose_recived}
                  onChange={this.onChange.bind(this, 'hcws_first_dose_recived')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of HCWs fully inoculated' prop='hcws_fully_inoculated'>
                <Input
                  type='number'
                  value={this.state.form.hcws_fully_inoculated}
                  onChange={this.onChange.bind(this, 'hcws_fully_inoculated')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of Citizens > 45 years received first dose for vaccination' prop='first_dose_recived_45years'>
                <Input
                  type='number'
                  value={this.state.form.first_dose_recived_45years}
                  onChange={this.onChange.bind(this, 'first_dose_recived_45years')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of Citizens > 45 years fully inoculated' prop='fully_inoculated_recived_45years'>
                <Input
                  type='number'
                  value={this.state.form.fully_inoculated_recived_45years}
                  onChange={this.onChange.bind(this, 'fully_inoculated_recived_45years')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of Citizens between 18 to 44 years received first dose for vaccination' prop='first_dose_recived_18_to_44years'>
                <Input
                  type='number'
                  value={this.state.form.first_dose_recived_18_to_44years}
                  onChange={this.onChange.bind(this, 'first_dose_recived_18_to_44years')}
                ></Input>
              </Form.Item>

              <Form.Item label='Number of Citizens between 18 to 44 years fully inoculated' prop='fully_inoclat_recived_18_to_44years'>
                <Input
                  type='number'
                  value={this.state.form.fully_inoclat_recived_18_to_44years}
                  onChange={this.onChange.bind(this, 'fully_inoclat_recived_18_to_44years')}
                ></Input>
              </Form.Item> */}

              {/* <Form.Item label='Total persons registered for vaccination'>
                <Input
                  type='number'
                  value={this.state.form.registered_for_vaccination}
                  onChange={this.onChange.bind(this, 'registered_for_vaccination')}
                ></Input>
              </Form.Item> */}

              <Form.Item label='Cumulative 1st Dose 18+ years till date' prop='total_first_dose_received'>
                <Input
                  type='number'
                  value={this.state.form.total_first_dose_received}
                  onChange={this.onChange.bind(this, 'total_first_dose_received')}
                ></Input>
              </Form.Item>

              <Form.Item label='Cumulative 2nd Dose 18+ years till date' prop='total_fully_inoculated'>
                <Input
                  type='number'
                  value={this.state.form.total_fully_inoculated}
                  onChange={this.onChange.bind(this, 'total_fully_inoculated')}
                ></Input>
              </Form.Item>
              <Form.Item label='Number of violations reported for not following Covid Appropriate
Behaviour today' prop='violations_reported_today'>
                <Input
                  type='number'
                  value={this.state.form.violations_reported_today}
                  onChange={this.onChange.bind(this, 'violations_reported_today')}
                ></Input>
              </Form.Item>

              <Form.Item label='Cumulative number of violations reported for not following Covid
Appropriate Behaviour' prop='cumulative_violations_reported'>
                <Input
                  type='number'
                  value={this.state.form.cumulative_violations_reported}
                  onChange={this.onChange.bind(this, 'cumulative_violations_reported')}
                ></Input>
              </Form.Item>

              <Form.Item label='Fine imposed for not following Covid Appropriate Behaviour today (in Rs.)' prop='fine_imposed_today'>
                <Input
                  type='number'
                  value={this.state.form.fine_imposed_today}
                  onChange={this.onChange.bind(this, 'fine_imposed_today')}
                ></Input>
              </Form.Item>

              <Form.Item label='Cumulative amount of fine imposed for not following Covid Appropriate
Behaviour (in Rs.) w.e.f. 01/04/2020 till date' prop='cumulative_fine_imposed'>
                <Input
                  type='number'
                  value={this.state.form.cumulative_fine_imposed}
                  onChange={this.onChange.bind(this, 'cumulative_fine_imposed')}
                ></Input>
              </Form.Item>


              {/* button */}
              <Form.Item>
                <Button type='warning' onClick={this.handleSubmit.bind(this)} loading={this.state.loading}> 
                  Submit
                </Button>
                {/* <Button onClick={this.handleReset.bind(this)}>Reset</Button> */}
              </Form.Item>
            </Form>
          </div>

          <div className='col-md-6 col-lg-6 dashboard_current_status'>
            <DashboardCurrentStatus />
          </div>
        </div>
      </Fragment>
    );
  }
}
