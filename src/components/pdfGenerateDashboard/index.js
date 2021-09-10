import React from "react";
import { Page, View, Document, StyleSheet, Font } from "@react-pdf/renderer";
import Header from "./header";
import MapPrint from "./map";
import DailyStatistics from "./dailyStatistics";
import CumStatistics from "./cumStatistics";
import BedStatistics from "./bedStatistics";
import StateChart from "./stateChart";
import DistrictChart from "./districtChart";
import VaccineStatistics from "./vaccineStatistics";
import VaccineChart from "./vaccineChart";
import BehaviourStatistics from "./behaviourStatistics";
import Footer from "./footer";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 0,
    // paddingBottom: 10,
    paddingHorizontal: 15,
  },

  // pageNumber: {
  //   position: 'absolute',
  //   fontSize: 12,
  //   bottom: 30,
  //   left: 0,
  //   right: 0,
  //   textAlign: 'center',
  //   color: 'grey',
  // },

  section1Container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 15,
    justifyContent: "space-between",
    maxHeight: 140,
  },
  section2Container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 15,
    justifyContent: "space-between",
    maxHeight: 140,
  },
  section5Container: {
    // display: 'flex',
    // flexDirection: 'row',
    // paddingTop: 15,
    marginTop: 15,
    // justifyContent: 'space-between',
    maxHeight: 110,
    border: "0.2 px solid #680707",
    borderRadius: 4,
  },
  section3Container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 15,
    justifyContent: "space-between",
    maxHeight: 160,
  },
  sectionWrapper: {
    width: "49%",
    // borderRadius: 4,
    // boxShadow: '0 4px 15px #1D3649',
    border: "0.2 px solid #680707",
    borderRadius: 4,
  },
  section4Container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 15,
    justifyContent: "space-between",
    maxHeight: 130,
  },
  sectionWrapperVaccince1: {
    width: "24%",
    borderRadius: 4,
    border: "0.2 px solid #680707",
  },
  sectionWrapperVaccince2: {
    width: "75%",
    borderRadius: 4,
    border: "0.2 px solid #680707",
  },
});

const DashboardReport = ({
  daily,
  cummulative,
  bedInfo,
  vaccination,
  covidBehaviourData,
  mapImageUrl,
  districtChartImageUrl,
  stateChartImageUrl,
  vaccineImageUrl,
}) => {
  return (
    <Document>
      <Page>
        <Header />
        <View style={styles.body}>
          <View style={styles.section1Container}>
            <View style={styles.sectionWrapper}>
              <MapPrint mapImageUrl={mapImageUrl} />
            </View>
            <View style={styles.sectionWrapper}>
              <DailyStatistics daily={daily} />
            </View>
          </View>

          <View style={styles.section2Container}>
            <View style={styles.sectionWrapper}>
              <CumStatistics
                cummulative={cummulative}
              />
            </View>
            <View style={styles.sectionWrapper}>
              <BehaviourStatistics covidBehaviourData={covidBehaviourData} />
            </View>
          </View>

          <View style={styles.section5Container}>
            <BedStatistics bedInfo={bedInfo} />
          </View>

          <View style={styles.section3Container}>
            <View style={styles.sectionWrapper}>
              <DistrictChart districtChartImageUrl={districtChartImageUrl} />
            </View>
            <View style={styles.sectionWrapper}>
              <StateChart stateChartImageUrl={stateChartImageUrl} />
            </View>
          </View>

          <View style={styles.section4Container}>
            <View style={styles.sectionWrapperVaccince1}>
              <VaccineStatistics vaccination={vaccination} />
            </View>
            <View style={styles.sectionWrapperVaccince2}>
              <VaccineChart vaccineImageUrl={vaccineImageUrl} />
            </View>
          </View>
        </View>

        <Footer fixed />
      </Page>
    </Document>
  );
};

export default DashboardReport;
