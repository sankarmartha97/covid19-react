import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { numberWithCommas } from "../../utils/numberComma";

import fonts from "./fontRegisterJson";
const LIGHT_BACKGROUND_COLOR = "#FFFDEA";
const HEADING_BACKGROUND_COLOR = "#F4EAD2";

Font.register(fonts);

const styles = StyleSheet.create({
  container: {
    // backgroundColor: LIGHT_BACKGROUND_COLOR,
    height: "100%",
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
  },
  headingContainer: {
    backgroundColor: HEADING_BACKGROUND_COLOR,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  headingText: {
    fontSize: 11,
    fontFamily: "Poppins",
    fontStyle: "SemiBold",
  },
  userCircle: {
    height: 7,
    width: 7,
    marginRight: 2,
  },
  cardsContainer: {
    height: 106,
    padding: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignContent: "center",
  },
  card: {
    height: 27,
    width: 123,
    backgroundColor: "#ffefd6",
    display: "flex",
    flexDirection: "row",
    padding: 6,
    justifyContent: "space-between",
    borderRadius: 4,
  },
  label: {
    fontSize: 8,
    paddingBottom: 0,
    marginBottom: 0,
    // color: "#02075D",
    fontFamily: "Poppins",
    fontStyle: "SemiBold",
    // color: "#306EBB"
  },
  valueDaily: {
    fontSize: 6,
    fontFamily: "Poppins",
  },
  value: {
    fontSize: 9,
    fontFamily: "Poppins",
    fontStyle: "SemiBold",
    color: "#11629b",
  },
  cardInnerSection1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: 'flex-end',
    alignItems: "center",
  },
  cardInnerSection2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

const VaccineStatistics = ({ vaccination }) => (
  <View style={styles.container}>
    <View style={styles.headingContainer}>
      <Text style={styles.headingText}>VACCINATION</Text>
    </View>
    <View style={styles.bodyContainer}>
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <View style={styles.cardInnerSection1}>
            {/*<Image style={styles.userCircle} src="/image/user-circle-solid.png" />*/}
            <Text style={styles.label}>1st Dose</Text>
          </View>
          <View style={styles.cardInnerSection2}>
            {/*  <Text style={styles.valueDaily}>+732</Text> */}
            <Text style={styles.value}>
              {vaccination.vaccinated1
                ? numberWithCommas(parseInt(vaccination.vaccinated1))
                : 0}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardInnerSection1}>
            {/*<Image style={styles.userCircle} src="/image/user-circle-solid.png" />*/}
            <Text style={styles.label}>2nd Dose</Text>
          </View>
          <View style={styles.cardInnerSection2}>
            {/*  <Text style={styles.valueDaily}>+732</Text> */}
            <Text style={styles.value}>
              {vaccination.vaccinated2
                ? numberWithCommas(parseInt(vaccination.vaccinated2))
                : 0}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardInnerSection1}>
            {/*<Image style={styles.userCircle} src="/image/user-circle-solid.png" />*/}
            <Text style={styles.label}>Total Dose</Text>
          </View>
          <View style={styles.cardInnerSection2}>
            {/*  <Text style={styles.valueDaily}>+732</Text> */}
            <Text style={styles.value}>
              {vaccination.total
                ? numberWithCommas(parseInt(vaccination.total))
                : 0}
            </Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default VaccineStatistics;
