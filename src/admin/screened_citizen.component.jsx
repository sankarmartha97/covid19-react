import React, { Component, Fragment } from 'react';
import { Table, Icon, Pagination, Button, MessageBox, Select, DatePicker, Notification } from 'element-react';
import 'element-theme-default';
import { format } from 'date-fns';
import { i18n } from 'element-react';
import { CSVLink } from "react-csv";
import locale from 'element-react/src/locale/lang/en';
import AuthService from '../authServices/AuthService';
import axios from 'axios';
import _ from 'lodash';
// import $ from 'jquery';

i18n.use(locale);
var dataOriginalCopy = [];
const Auth = new AuthService();
var self;
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
export default class ScreenedCitizen extends Component {
  // constructor def
  constructor(props) {
    super(props);
    this.state = {
      //
      columns: [
        {
          type: 'selection',
          label: "select",
          prop: "select",
          width: 250
        },
        {
          type: 'expand',
          expandPannel: function (data) {


            return (
              <>
                <div className='row'>
                  <div className='col-sm-10'>

                    <div className='citizen_screened_title'>
                      <p>
                        <span>
                          <i className='fas fa-user-check'></i>&nbsp;
                        </span>
                        Samples Report
                      </p>
                    </div>
                    <div className='citizen_screened_body'>

                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Tested At Check Gates:  </p>
                          <input
                            type="number"
                            name={'check_gate_tested'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.check_gate_tested}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Tested At Flu Clinics/ Health Facilities: </p>
                          <input
                            type="number"
                            name={'health_facilities_tested'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.health_facilities_tested}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>

                      </div>

                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Persons Tested Today:  </p>
                          <input
                            type="number"
                            name={'tested'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.tested}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Persons Tested Negative Today: </p>
                          <input
                            type="number"
                            name={'tested_negative'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.tested_negative}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>

                      </div>
                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Persons Tested Positive Today:   </p>
                          <input
                            type="number"
                            name={'tested_positive'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.tested_positive}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Persons Cured today:   </p>
                          <input
                            type="number"
                            name={'cured'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.cured}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>
                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Persons Death today:</p>
                          <input
                            type="number"
                            name={'death'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.death}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>

                        <div className="expandable-body-section-1">

                          <p className='label-expandable-row'> Cumulative Tested Cases w.e.f. 01.04.2020 tilldate:  </p>
                          <input
                            type="number"
                            name={'cumulative_tested'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.cumulative_tested}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>
                      <div className="expandable-body-section-1-row-wrapper">

                        <div className="expandable-body-section-1">

                          <p className='label-expandable-row'> Cumulative Positive Cases w.e.f. 01.04.2020 tilldate:  </p>
                          <input
                            type="number"
                            name={'cumulative_positive'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.cumulative_positive}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>


                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Cumulative persons cured / discharged w.e.f. 01.04.2020 tilldate:  </p>
                          <input
                            type="number"
                            name={'cumulative_cured'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.cumulative_cured}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>
                      <div className="expandable-body-section-1-row-wrapper">

                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Cumulative number of COVID-19 Deaths w.e.f. 01.04.2020 tilldate:  </p>
                          <input
                            type="number"
                            name={'cumulative_deaths'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.cumulative_deaths}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Total Active cases as on today:  </p>
                          <input
                            type="number"
                            name={'active_case'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.active_case}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-10'>
                    <div className='citizen_screened_title'>
                      <p>
                        <span>
                          <i className='fas fa-stethoscope'></i>&nbsp;
                        </span>
                        Dedicated Covid Hospitals (DCH)
                      </p>
                    </div>
                    <div className='citizen_screened_body'>

                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>  No. of DCH:   </p>
                          <input
                            // id = {data.id+'_no_dch'}
                            type="number"
                            name={'covid_hospitals'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.covid_hospitals}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />

                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>No. of Beds in DCH:  </p>
                          <input
                            type="number"
                            name={'covid_hospital_beds'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.covid_hospital_beds}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>

                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Currently admitted in DCH:  </p>
                          <input
                            type="number"
                            name={'covid_hospital_admitted'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.covid_hospital_admitted}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>ICU beds in DCH:   </p>
                          <input
                            type="number"
                            name={'covid_hospital_icu_beds'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.covid_hospital_icu_beds}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>

                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>ICU beds occupied in DCH:  </p>
                          <input
                            type="number"
                            name={'covid_hospitals_icu_bed_occupied'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.covid_hospitals_icu_bed_occupied}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>O2 beds in DCH:  </p>
                          <input
                            type="number"
                            name={'covid_hospital_o2_beds'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.covid_hospital_o2_beds}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>

                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>O2 beds occupied in DCH:  </p>
                          <input
                            type="number"
                            name={'covid_hospital_o2_bed_occupied'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.covid_hospital_o2_bed_occupied}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                        <div className="expandable-body-section-1">

                          <p className='label-expandable-row'>Non-O2 beds in DCH:  </p>
                          <input
                            type="number"
                            name={'covid_hospital_non_o2_beds'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.covid_hospital_non_o2_beds}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>

                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Non-O2 beds occupied in DCH:  </p>
                          <input
                            type="number"
                            name={'covid_hospital_non_o2_bed_occupied'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.covid_hospital_non_o2_bed_occupied}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-10'>
                    <div className='citizen_screened_title'>
                      <p>
                        <span>
                          <i className='fas fa-stethoscope'></i>&nbsp;
                        </span>
                        Dedicated Covid Health Centres (DCHC)
                      </p>
                    </div>
                    <div className='citizen_screened_body'>

                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>No. of DCHC: </p>
                          <input
                            type="number"
                            name={'dchc'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.dchc}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />

                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>No. of beds in DCHC:  </p>
                          <input
                            type="number"
                            name={'dchc_beds'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.dchc_beds}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>
                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Currently admitted in DCHC:  </p>
                          <input
                            type="number"
                            name={'dchc_admitted'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.dchc_admitted}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>ICU beds in DCHC:  </p>
                          <input
                            type="number"
                            name={'dchc_icu_beds'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.dchc_icu_beds}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>

                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>ICU beds occupied in DCHC:  </p>
                          <input
                            type="number"
                            name={'dchc_icu_beds_occupied'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.dchc_icu_beds_occupied}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>O2 beds in DCHC:  </p>
                          <input
                            type="number"
                            name={'dchc_o2_beds'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.dchc_o2_beds}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>

                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>O2 beds occupied in DCHC:</p>
                          <input
                            type="number"
                            name={'dchc_o2_occupied'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.dchc_o2_occupied}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Non-O2 beds in DCHC:  </p>
                          <input
                            type="number"
                            name={'dchc_non_o2_beds'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.dchc_non_o2_beds}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>
                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Non-O2 beds occupied in DCHC:</p>
                          <input
                            type="number"
                            name={'dchc_non_o2_beds_occupied'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.dchc_non_o2_beds_occupied}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-10'>
                    <div className='citizen_screened_title'>
                      <p>
                        <span>
                          <i className='fas fa-stethoscope'></i>&nbsp;
                        </span>
                        Covid Care Centres (CCC)
                      </p>
                    </div>
                    <div className='citizen_screened_body'>

                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>No. of CCC: </p>
                          <input
                            type="number"
                            name={'ccc'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.ccc}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />

                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>No. of beds in CCC: </p>
                          <input
                            type="number"
                            name={'ccc_beds'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.ccc_beds}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />

                        </div>
                      </div>

                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Currently admitted in CCC:   </p>
                          <input
                            type="number"
                            name={'ccc_admitted'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.ccc_admitted}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />

                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Under Home Isolation:  </p>
                          <input
                            type="number"
                            name={'home_isolation'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.home_isolation}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>

                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>O2 beds in CCC:   </p>
                          <input
                            type="number"
                            name={'ccc_o2_beds'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.ccc_o2_beds}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />

                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>O2 beds occupied in CCC:  </p>
                          <input
                            type="number"
                            name={'ccc_o2_occupied'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.ccc_o2_occupied}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>

                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Non-O2 beds in CCC:   </p>
                          <input
                            type="number"
                            name={'ccc_non_o2_beds'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.ccc_non_o2_beds}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />

                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Non-O2 beds occupied:  </p>
                          <input
                            type="number"
                            name={'ccc_non_o2_occupied'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.ccc_non_o2_occupied}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>







                <div className='row'>
                  <div className='col-sm-10'>
                    <div className='citizen_screened_title'>
                      <p>
                        <span>
                          <i className='fas fa-stethoscope'></i>&nbsp;
                        </span>
                        Status of Vaccination
                      </p>
                    </div>
                    <div className='citizen_screened_body'>
                      {/* <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>No. of FLWs Received first does vaccination: </p>
                          <input
                            type="number"
                            name={'flw_1st_dose_received'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.flw_1st_dose_received}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>No. of FLWs Fully inoculated:   </p>
                          <input
                            type="number"
                            name={'flw_fully_inoculated'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.flw_fully_inoculated}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div> */}
                      {/* <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>No. of HCWs Recived first does for vaccination : </p>
                          <input
                            type="number"
                            name={'hcw_1st_dose_received'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.hcw_1st_dose_received}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />

                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>No.of HCWs fully inoculated:  </p>
                          <input
                            type="number"
                            name={'hcw_fully_inoculated'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.hcw_fully_inoculated}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />

                        </div>
                      </div> */}
                      {  // ----------------------------------------------------------------------------------------------
                      }

                      {/* <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>No. of Citizens {'>'} 45 years received first dose for vaccination:   </p>
                          <input
                            type="number"
                            name={'fst_dose_recived_45years'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.fst_dose_recived_45years}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>No. of Citizens {'>'} 45 years fully inoculated: </p>
                          <input
                            type="number"
                            name={'fully_inoculated_45years'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.fully_inoculated_45years}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div> */}
                      {/* <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>No. of Citizens between 18 to 44 years received first dose for vaccination:  </p>
                          <input
                            type="number"
                            name={'fst_dose_recived_18_to_44years'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.fst_dose_recived_18_to_44years}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />

                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>No. of Citizens between 18 to 44 years fully inoculated:  </p>
                          <input
                            type="number"
                            name={'fully_inoculated_18_to_44years'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.fully_inoculated_18_to_44years}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />

                        </div>
                      </div> */}
                      {                    // ----------------------------------------------------------------------------------------------
                      }
                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Cumulative 1st Dose 18+ years till date: </p>
                          <input
                            type="number"
                            name={'total_received_1st_dose'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.total_received_1st_dose}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Cumulative 2nd Dose 18+ years till date: </p>
                          <input
                            type="number"
                            name={'total_fully_inoculated'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.total_fully_inoculated}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>







                <div className='row'>
                  <div className='col-sm-10'>
                    <div className='citizen_screened_title'>
                      <p>
                        <span>
                          <i className='fas fa-stethoscope'></i>&nbsp;
                        </span>
                        Covid Appropriate Behaviour
                      </p>
                    </div>
                    <div className='citizen_screened_body'>
                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>No. of violations reported for not following Covid Appropriate Behaviour today:   </p>
                          <input
                            type="number"
                            name={'violations_reported_today'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.violations_reported_today}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Cumulative number of violations reported for not following Covid Appropriate Behaviour:  </p>
                          <input
                            type="number"
                            name={'cumulative_violations_reported'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.cumulative_violations_reported}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>

                      <div className="expandable-body-section-1-row-wrapper">
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Fine imposed for not following Covid Appropriate Behaviour today (in Rs.):</p>
                          <input
                            type="number"
                            name={'fine_imposed_today'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.fine_imposed_today}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                        <div className="expandable-body-section-1">
                          <p className='label-expandable-row'>Cumulative amount of fine imposed for not following Covid Appropriate Behaviour (in Rs.) w.e.f. 01/04/2020 till date:  </p>
                          <input
                            type="number"
                            name={'cumulative_fine_imposed'}
                            disabled={data.id !== self.state.editRowId}
                            value={data.cumulative_fine_imposed}
                            onChange={(e) => { self.onChangeRowData(e, data) }}
                          />
                        </div>
                      </div>


                    </div>
                  </div>
                </div>


              </>
            );
          },
        },
        {
          label: 'Uploaded At',
          prop: 'create_at',
          sortable: true,
          width: 150,
          render: function (data) {
            return (
              <span>
                <Icon name='time' />
                <span style={{ marginLeft: '10px' }}>{format(new Date(data.create_at), 'dd.MM.YYY HH.MM')}</span>
              </span>
            );
          },
        },
        {
          label: 'District',
          prop: 'name',
          width: 140,
          sortable: true,
        },
        {
          label: 'Date',
          prop: 'date',
          sortable: true,
          width: 110,
          render: function (data) {
            return (
              <span>
                <Icon name='time' />
                <span style={{ marginLeft: '10px' }}>{format(new Date(data.date), 'dd.MM.YYY ')}</span>
              </span>
            );
          },
        },
        {
          width: 87,
          label: 'Total Positive',
          prop: 'cumulative_positive',
        },
        {

          label: 'Total Cured',
          prop: 'cumulative_cured',
        },
        {
          width: 82,
          label: 'Total Deaths',
          prop: 'cumulative_deaths',
        },
        {
          width: 125,
          label: 'Check Gates Tested Today',
          prop: 'check_gate_tested',
        },
        {
          label: 'Flu Clinics/ Health Facilities Tested Today',
          prop: 'health_facilities_tested',
          width: 140,
        },
        {
          label: "Operations",
          fixed: 'right',
          width: 160,
          render: (data) => {
            return <div>
              {(this.state.editRowId !== data.id) && <Button plain={true} type="info" size="mini" onClick={() => { this.onEditRow(data) }}><i class="fas  fa-pen tab_ico icon-edit-row"></i>Edit</Button>}
              {(this.state.editRowId === data.id) && <Button plain={true} type="danger" size="mini" id='btn-cancel-edits' onClick={() => { this.onCancelEditRow(data) }}><i class="fas fa-ban"></i> Cancel</Button>}
              {/* <Button type="primary" onClick={this.onclick.bind(this, data.id)} size="small">Approve</Button> */}
              {(this.state.editRowId === data.id) && <Button type="success" plain={true} size="mini" onClick={() => { this.onSaveEditRow(data) }}><i class="far fa-save"></i> Save </Button>}
              {/* <Button type="text" size="small">Detail</Button><Button type="text" size="small">Edit</Button> */}
            </div>
          }
        }
      ],

      //
      value: '',
      districtValue: '',
      datevalue: null,
      data: [],
      dataCopyCSV: [],
      loading: false,
      data_by_page: [],
      current_page: 1,
      page_size: 10,
      total: 1,
      editRowId: null,
      selection: []

    }; // Eof state def
    this.Auth = new AuthService();
  } // Eof constructor def

  async componentDidMount() {
    let district = this.state.value || 'null';
    let date = this.state.datevalue || 'null';

    await this.districtlist();
    await this.getCitizenData(district, date);
    await this.setRecordsByPage()
  }
  onChangeRowData = async (e, data) => {
    var dataCopy = this.state.data_by_page;
    const row_id = data.id;
    for (let index = 0; index < dataCopy.length; index++) {
      const element = dataCopy[index];
      if (row_id === element.id) {
        // console.log("old ",element.covid_hospitals, "New ", e.target.value);
        dataCopy[index][e.target.name] = parseInt(e.target.value);
        // console.log(e.target.name, e.target.value);
        break
      }
    }
    this.setState({ data: dataCopy });
  }
  onEditRow = async (data) => {
    // console.log(data.id);
    this.setState({ editRowId: data.id })
    // $('el-table__expand-icon').click()
    // console.log(self);
  }

  onSaveEditRow = async (data) => {
    // console.log(data.id);
    this.setState({ editRowId: null })
    // console.log(self);
  }

  onCancelEditRow = async (data) => {
    // console.log(data);
    if (this.state.editRowId !== null) {
      // console.log(data.id);
      var row_id = data.id;
      // console.log(dataOriginalCopy);
      var dataCopy = _.cloneDeep(this.state.data_by_page);
      // console.log(dataCopy);
      for (let index = 0; index < dataCopy.length; index++) {
        const element = dataCopy[index];
        if (row_id === element.id) {
          dataCopy[index] = _.cloneDeep(dataOriginalCopy[index]);
          // console.log(dataOriginalCopy[index]);
          // console.log( dataCopy[index])
          break;
        }
      }
      // console.log(dataCopy);
      
      this.setState({ data_by_page: dataCopy }, () => {
        console.log(this.state.data_by_page);
        this.setState({ editRowId: null })
      })

        this.setState({ editRowId: null })


      // this.setState({ data: dataCopy }, () => {
      //   console.log(this.state.data);
      //   this.setState({ editRowId: null })
      //   // self.state.data = this.state.data
      // })
      // console.log(this.state.data); 
    }
  }


  onSubmitEdits = async () => {
    // API calls
    if (this.state.selection.length === 0) {
      Notification.error({
        title: 'Error',
        message: 'No rows selected'
      });
    } else {
      //API CALL HERE TO UPDATE DATA & Refresh  
      // console.log('Final Submission Data', this.state.selection);
      try {
        axios.post(`${process.env.REACT_APP_URL}/admin/verify`, {
          body: this.state.selection
        }, {
          headers: {
            'Authorization': localStorage.getItem('id_token'),
          }
        })
          .then((res) => {
            if (res.data.status == 200) {
              MessageBox.alert(`${res.data.message}`, 'Success', {
                // confirmButtonText: 'OK',
                // cancelButtonText: 'Cancel',
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
                // confirmButtonText: 'OK',
                // cancelButtonText: 'Cancel',
                showConfirmButton: true,
                type: 'error',
              })
              // window.location.reload(true);
              //   setTimeout(function(){
              //     window.location.reload(1);
              //  }, 3000);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
  // onclick = async (e) => {
  //   if (!this.Auth.isTokenExpired) {
  //     await this.Auth.logout()
  //   } else {
  //     let id = e;
  //     try {
  //       await fetch(`${process.env.REACT_APP_URL}/admin/verify`, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-type': 'application/json; charset=UTF-8',
  //           'authorization': localStorage.getItem('id_token'),
  //           // 'key': localStorage.getItem('key'),
  //           // 'reqid': localStorage.getItem('request'),
  //         },
  //         body: JSON.stringify({
  //           id,
  //           verified: true,
  //         }),
  //       })
  //         .then((res) => res.json())
  //         .then((res) => {
  //           if (res.status == 200) {
  //             MessageBox.confirm(`${res.message}`, 'Success', {
  //               // confirmButtonText: 'OK',
  //               // cancelButtonText: 'Cancel',
  //               showConfirmButton: true,
  //               type: 'success',
  //             })
  //               .then(() => {
  //                 window.location.reload(true);
  //               })
  //               .catch(() => {
  //                 window.location.reload(true);
  //               });
  //           } else {
  //             Message({
  //               type: 'error',
  //               message: res.message
  //             });
  //             // window.location.reload(true);
  //             //   setTimeout(function(){
  //             //     window.location.reload(1);
  //             //  }, 3000);
  //           }
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }


  getCitizenData = async ( district, date ) => {
    console.log(district,date);
    if (!this.Auth.isTokenExpired) {
      this.Auth.logout()
    } else {
      try {
        this.setState({ loading: true });
        await fetch(`${process.env.REACT_APP_URL}/admin/reqSet?district=${district}&date=${date}`)
          .then((res) => res.json())
          .then((res) =>
            this.setState({ data: res.data, dataCopyCSV: res.data }, () => {
              this.setRecordsByPage();
              this.setState({ loading: false });
              // dataOriginalCopy = _.cloneDeep(res.data);

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

  //
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

  //
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

  //
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
    },()=>{ dataOriginalCopy = _.cloneDeep(this.state.data_by_page);})
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
    // console.log(district, date);
    this.getCitizenData(district, date);
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
    // console.log(date, district);
    this.getCitizenData(district, date);
  }

  // render main component
  render() {
    self = this;
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
            <p>District Uploaded report</p>
          </div>
        </div>
        <div className='report_filter_section'>
        <label htmlFor='filter_title' className='report_filter_title'>
            Filter -
          </label>

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
                  value={el.id}
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

          <button className="btn btn_cat_csv">
            <CSVLink filename={`District Uploaded report ${Date.now()}.csv`} data={this.state.dataCopyCSV} headers={headers}>Download CSV
              <i className="fas fa-file-csv exe_csv"></i>
            </CSVLink>
          </button>
        </div>
        <div className='citizen_body_section'>
          {loading ? (
            <div className='loader_section'>
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
                height={450}
                fit={true}
                onSelectChange={(selection) => { this.setState({ selection: selection }) }}
                onSelectAll={(selection) => { this.setState({ selection: selection }) }}
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
                <Button className="submit-edits-btn"
                  type="primary"
                  size="small"
                  onClick={() => { this.onSubmitEdits() }}
                >
                  Submit Edits <i className="el-icon-arrow-right el-icon-right"></i>
                </Button>

              </div>
            </>
          )}

        </div>

      </Fragment>
    );
  }
}


// child component
const UserNotFound = () => {
  return (
    <div className="container user_not_found">
      <i className="fas fa-users user_ico"></i>
      <p>User not found</p>
    </div>
  )
}