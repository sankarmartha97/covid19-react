import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { useParams } from 'react-router-dom';
import { PDFViewer } from "@react-pdf/renderer";
import moment from "moment";
import axios from "axios";
import AuthService from '../../authServices/AuthService';

const Auth = new AuthService();
// const { id } = useParams();

const BORDER_COLOR = "#000000";
const BORDER_STYLE = "solid";
const COL0_WIDTH = 8;
const COL1_WIDTH = 59;
const COLN_WIDTH = (100 - COL0_WIDTH - COL1_WIDTH) / 2;
var date1 = null, date1_NoYear = null, date2_NoYear= null;
Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

// const dataRes = result.data;
// console.log(dataRes);

const totalPopulation = sessionStorage.getItem("totalpopulations") || 1062840;
//Added Sample Data(Incorrect), Get from API

const styles = StyleSheet.create({
  body: {
    paddingTop: 7,
    paddingBottom: 50,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    //   marginVertical: 15,
    //   marginHorizontal: 100,
    alignSelf: "center",
    width: "90px",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 7,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },

  titleContainer: {
    display: "flex",
    flexDirection: "column",
    //   borderBottomWidth: 2,
    //   borderBottomColor: '#112131',
    //   borderBottomStyle: 'solid',
    marginTop: "4px",
    marginBottom: "7px",
    fontSize: "10px",
    //   height: '70px',
    justifyContent: "space-between",
    //   alignContent: 'center',
    //   textAlign: 'center'
  },
  titleText1: {
    color: "#0070c0",
    fontWeight: 700,
    alignSelf: "center",
    alignContent: "center",
    fontSize: 9,
    marginTop: 1,
    fontFamily: "Helvetica",
  },
  titleText2: {
    color: "#000000",
    fontWeight: 700,
    alignSelf: "center",
    alignContent: "center",
    fontSize: 9,
    marginTop: 1,
    fontFamily: "Helvetica",
  },

  table: {
    display: "table",
    width: "auto",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 0.5,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRowHeaderMain: {
    margin: "auto",
    flexDirection: "row",
    color: "#FFFFFF",
    backgroundColor: "#1f497c",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol0Header: {
    width: COL0_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px 0px",
    textAlign: "center",
  },
  tableCol1Header: {
    width: COL1_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px 0px",
    textAlign: "center",
  },
  tableColHeader: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: "2px 0px",
    textAlign: "center",
  },
  tableCol0Subhead: {
    width: COL0_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#8eb3e2",
    textAlign: "center",
  },
  tableCol1Subhead: {
    width: COL1_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#8eb3e2",
  },
  tableColSubhead: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#8eb3e2",
  },
  tableCol0: {
    width: COL0_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "center",
  },
  tableCol1: {
    width: COL1_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "right",
  },
  tableCellHeader: {
    margin: 2,
    fontSize: 9,
    // fontWeight: 50   0,
    fontFamily: "Helvetica-Bold",
  },
  tableCell: {
    margin: 2,
    fontSize: 8,
  },
});

const subHeading1 = { sl: "A", label: "Health Screening & Charges" };
const subHeading2 = { sl: "B", label: "Samples Report" };
const subHeading3 = { sl: "C", label: "Dedicated Covid Hospitals (DCH)" };
const subHeading4 = { sl: "D", label: "Dedicated Covid Health Centres (DCHC)" };
const subHeading5 = { sl: "E", label: "COVID Care Centres (CCC)" };
const subHeading6 = { sl: "F", label: "Status of Vaccination" };
const subHeading7 = { sl: "G", label: "COVID Appropriate Behaviour" };

export const SubheadingRow = ({ subHeadingData }) => (
  <View style={styles.tableRow}>
    <View style={styles.tableCol0Subhead}>
      <Text style={styles.tableCell}>{subHeadingData.sl}</Text>
    </View>
    <View style={styles.tableCol1Subhead}>
      <Text style={styles.tableCell}>{subHeadingData.label}</Text>
    </View>
    <View style={styles.tableColSubhead}>
      <Text style={styles.tableCell}></Text>
    </View>
    <View style={styles.tableColSubhead}>
      <Text style={styles.tableCell}></Text>
    </View>
  </View>
);

const healthScreeningData = [
  {
    label: "Number of persons tested at Check Gates today",
    key: "check_gate_tested",
  },
  {
    label: "Number of Patients tested in FLU CLINICS/ Health Facilities today",
    key: "health_facilities_tested",
  },
];
const samplesData = [
  { label: "Number of persons tested today", key: "tested" },
  { label: "Number of persons tested negative today", key: "tested_negative" },
  { label: "Number of persons tested positive today", key: "tested_positive" },
  {
    label: "Cumulative Positive Cases w.e.f. 01/04/2020 till date",
    key: "cumulative_positive",
  },
  { label: "Number of persons cured/ discharged today", key: "cured" },
  {
    label:
      "Cumulative number of persons cured /discharged w.e.f. 01/04/2020 till date",
    key: "cumulative_cured",
  },
  { label: "Total Active cases as on today", key: "active_case" },
  { label: "COVID-19 deaths today", key: "death" },
  {
    label: "Cumulative number of COVID-19 Deaths w.e.f. 01/04/2020 till date",
    key: "cumulative_deaths",
  },
];

const dchData = [
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
];
const dchcData = [
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
];

const cccData = [
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
];

const vaccineData = [
  {
    label: "Total persons who received the first dose",
    key: "total_received_1st_dose",
  },
  { label: "Total persons fully inoculated", key: "total_fully_inoculated" },
];

const covidBehaviourData = [
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
];

export const DataRows = ({ inputData, dataRes }) =>
  inputData.map((data, index) => {
    return (
      <View style={styles.tableRow}>
        <View style={styles.tableCol0}>
          <Text style={styles.tableCell}>{index + 1}</Text>
        </View>
        <View style={styles.tableCol1}>
          <Text style={styles.tableCell}>{data.label}</Text>
        </View>
        <View style={styles.tableCol}>
          {data.key === "tested_positive" ? (
            <Text style={styles.tableCell}>
              {dataRes[0][data.key]} (
              {dataRes[0]["tested"]
                ? (
                    (dataRes[0]["tested_positive"] / dataRes[0]["tested"]) *
                    100
                  ).toFixed(2)
                : "0.00"}
              %)
            </Text>
          ) : data.key === "cumulative_cured" ? (
            <Text style={styles.tableCell}>
              {dataRes[0][data.key]} (
              {dataRes[0]["cumulative_positive"]
                ? (
                    (dataRes[0]["cumulative_cured"] /
                      dataRes[0]["cumulative_positive"]) *
                    100
                  ).toFixed(2)
                : "0.00"}
              %)
            </Text>
          ) : data.key === "covid_hospitals_icu_bed_occupied" ? (
            <Text style={styles.tableCell}>
              {dataRes[0][data.key]} (
              {dataRes[0]["covid_hospital_icu_beds"]
                ? (
                    (dataRes[0]["covid_hospitals_icu_bed_occupied"] /
                      dataRes[0]["covid_hospital_icu_beds"]) *
                    100
                  ).toFixed(2)
                : "0.00"}
              %)
            </Text>
          ) : data.key === "covid_hospital_o2_bed_occupied" ? (
            <Text style={styles.tableCell}>
              {dataRes[0][data.key]} (
              {dataRes[0]["covid_hospital_o2_beds"]
                ? (
                    (dataRes[0]["covid_hospital_o2_bed_occupied"] /
                      dataRes[0]["covid_hospital_o2_beds"]) *
                    100
                  ).toFixed(2)
                : "0.00"}
              %)
            </Text>
          ) : data.key === "dchc_o2_occupied" ? (
            <Text style={styles.tableCell}>
              {dataRes[0][data.key]} (
              {dataRes[0]["dchc_o2_beds"]
                ? (
                    (dataRes[0]["dchc_o2_occupied"] /
                      dataRes[0]["dchc_o2_beds"]) *
                    100
                  ).toFixed(2)
                : "0.00"}
              %)
            </Text>
          ) : data.key === "total_received_1st_dose" ? (
            <Text style={styles.tableCell}>
              {dataRes[0][data.key]} (
              {totalPopulation
                ? (
                    (dataRes[0]["total_received_1st_dose"] / totalPopulation) *
                    100
                  ).toFixed(2)
                : "0.00"}
              %)
            </Text>
          ) : data.key === "total_fully_inoculated" ? (
            <Text style={styles.tableCell}>
              {dataRes[0][data.key]} (
              {totalPopulation
                ? (
                    (dataRes[0]["total_fully_inoculated"] / totalPopulation) *
                    100
                  ).toFixed(2)
                : "0.00"}
              %)
            </Text>
          ) : (
            <Text style={styles.tableCell}>{dataRes[0][data.key]}</Text>
          )}
        </View>
        <View style={styles.tableCol}>
          {data.key === "tested_positive" ? (
            <Text style={styles.tableCell}>
              {dataRes[1][data.key]} (
              {dataRes[1]["tested"]
                ? (
                    (dataRes[1]["tested_positive"] / dataRes[1]["tested"]) *
                    100
                  ).toFixed(2)
                : "0.00"}
              %)
            </Text>
          ) : data.key === "cumulative_cured" ? (
            <Text style={styles.tableCell}>
              {dataRes[1][data.key]} (
              {dataRes[1]["cumulative_positive"]
                ? (
                    (dataRes[1]["cumulative_cured"] /
                      dataRes[1]["cumulative_positive"]) *
                    100
                  ).toFixed(2)
                : "0.00"}
              %)
            </Text>
          ) : data.key === "covid_hospitals_icu_bed_occupied" ? (
            <Text style={styles.tableCell}>
              {dataRes[1][data.key]} (
              {dataRes[1]["covid_hospital_icu_beds"]
                ? (
                    (dataRes[1]["covid_hospitals_icu_bed_occupied"] /
                      dataRes[1]["covid_hospital_icu_beds"]) *
                    100
                  ).toFixed(2)
                : "0.00"}
              %)
            </Text>
          ) : data.key === "covid_hospital_o2_bed_occupied" ? (
            <Text style={styles.tableCell}>
              {dataRes[1][data.key]} (
              {dataRes[1]["covid_hospital_o2_beds"]
                ? (
                    (dataRes[1]["covid_hospital_o2_bed_occupied"] /
                      dataRes[1]["covid_hospital_o2_beds"]) *
                    100
                  ).toFixed(2)
                : "0.00"}
              %)
            </Text>
          ) : data.key === "dchc_o2_occupied" ? (
            <Text style={styles.tableCell}>
              {dataRes[1][data.key]} (
              {dataRes[1]["dchc_o2_beds"]
                ? (
                    (dataRes[1]["dchc_o2_occupied"] /
                      dataRes[1]["dchc_o2_beds"]) *
                    100
                  ).toFixed(2)
                : "0.00"}
              %)
            </Text>
          ) : data.key === "total_received_1st_dose" ? (
            <Text style={styles.tableCell}>
              {dataRes[1][data.key]} (
              {totalPopulation
                ? (
                    (dataRes[1]["total_received_1st_dose"] / totalPopulation) *
                    100
                  ).toFixed(2)
                : "0.00"}
              %)
            </Text>
          ) : data.key === "total_fully_inoculated" ? (
            <Text style={styles.tableCell}>
              {dataRes[1][data.key]} (
              {totalPopulation
                ? (
                    (dataRes[1]["total_fully_inoculated"] / totalPopulation) *
                    100
                  ).toFixed(2)
                : "0.00"}
              %)
            </Text>
          ) : (
            <Text style={styles.tableCell}>{dataRes[1][data.key]}</Text>
          )}
        </View>
      </View>
    );
  });

const MyDocument2 = () => {
  const [dataRes, setDataRes] = useState([]);

  const fetchdata = async (date) => {
    try{
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/admin/report?q=${date}`
      );
      date1 = moment(response.data.data[0]["date"]).format("Do MMMM YYYY");
      date1_NoYear = moment(response.data.data[0]["date"]).format("Do MMMM");
      date2_NoYear = moment(response.data.data[1]["date"]).format("Do MMMM");
      setDataRes(response.data.data);
    } catch(e){
      console.log(e);
    }

  };

  const { id } = useParams();
  const date = moment(id, "x").format("YYYY-MM-DD");

  useEffect(() => {
    if(Auth.loggedIn()){
      fetchdata(date);
    }
    else {
      window.location.replace(`/app/login`);
    }

  },[]);
  // console.log(dataRes);
  // const date1 = moment(dataRes[0]["date"]).format("Do MMMM YYYY");
  // const date1_NoYear = moment(dataRes[0]["date"]).format("Do MMMM");
  // const date2_NoYear = moment(dataRes[1]["date"]).format("Do MMMM");

  return (
    <PDFViewer width={"100%"} height={760}>
     { dataRes.length !== 0  &&
      <Document>
        <Page style={styles.body}>
          {/*  
        <Text style={styles.header} fixed>
          https://arunachalpradesh.gov.in/
        </Text>
    */}
          <Image style={styles.image} src="/image/logo.png" />
          <View style={styles.titleContainer}>
            <Text style={styles.titleText2}>
              GOVERNMENT OF ARUNACHAL PRADESH
            </Text>

            <Text style={styles.titleText1}>
              STATE CONTROL ROOM FOR COVID 19 MONITORING
            </Text>

            <Text style={styles.titleText2}>
              Covid-19 Daily Report as on {date1}
            </Text>
          </View>

          <View style={styles.table}>
            <View style={styles.tableRowHeaderMain}>
              <View style={styles.tableCol0Header}>
                <Text style={styles.tableCellHeader}>Sl. No</Text>
              </View>
              <View style={styles.tableCol1Header}>
                <Text style={styles.tableCellHeader}>Particulars</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Total {date1_NoYear}</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Total {date2_NoYear}</Text>
              </View>
            </View>

            <SubheadingRow subHeadingData={subHeading1} />
            <DataRows inputData={healthScreeningData} dataRes={dataRes} />

            <SubheadingRow subHeadingData={subHeading2} />
            <DataRows inputData={samplesData} dataRes={dataRes} />

            <SubheadingRow subHeadingData={subHeading3} />
            <DataRows inputData={dchData} dataRes={dataRes} />

            <SubheadingRow subHeadingData={subHeading4} />
            <DataRows inputData={dchcData} dataRes={dataRes} />

            <SubheadingRow subHeadingData={subHeading5} />
            <DataRows inputData={cccData} dataRes={dataRes} />

            <SubheadingRow subHeadingData={subHeading6} />
            <DataRows inputData={vaccineData} dataRes={dataRes} />

            <SubheadingRow subHeadingData={subHeading7} />
            <DataRows inputData={covidBehaviourData} dataRes={dataRes} />
          </View>

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    }</PDFViewer>
  );
};

//   ReactDOM.render(<MyDocument />, document.getElementById('root'));
//   ReactPDF.render(MyDocument);

export default MyDocument2;
