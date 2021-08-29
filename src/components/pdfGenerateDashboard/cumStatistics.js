import React from "react";
import { Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";

import fonts from "./fontRegisterJson";
import { numberWithCommas } from "../../utils/numberComma";
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
  },
  cardsContainer: {
    padding: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    height: 45,
    width: 130,
    display: "flex",
    flexDirection: "column",
    padding: 6,
    justifyContent: "space-between",
    borderRadius: 4,
    backgroundColor: "#ffefd6",
  },
  label: {
    fontSize: 8,
    // color: "#A47861"
    // color: "#02075D",
    fontFamily: "Poppins",
    fontStyle: "SemiBold",
  },
  value: {
    fontSize: 9,
    fontFamily: "Poppins",
    fontStyle: "SemiBold",
    color: "#d07321",
  },
  cardInnerSection1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: "#ffefd6",
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

const CumStatistics = ({ cummulative, oneDayChange }) => (
  <View style={styles.container}>
    <View style={styles.headingContainer}>
      <Text style={styles.headingText}>CUMULATIVE COVID STATISTICS </Text>
    </View>
    <View style={styles.bodyContainer}>
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <View style={styles.cardInnerSection1}>
            <Text style={styles.label}>Total Tests Done</Text>
            {/* <Image style={styles.userCircle} src="/image/user-circle-solid.png" />*/}
          </View>
          <Text style={styles.value}>
            {numberWithCommas(
              parseInt(cummulative.tested) + parseInt(oneDayChange.tested)
            )}
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardInnerSection1}>
            <Text style={styles.label}>Confirmed</Text>
            {/* <Image style={styles.userCircle} src="/image/user-circle-solid.png" /> */}
          </View>
          <Text style={styles.value}>
            {numberWithCommas(
              parseInt(cummulative.confirmed) + parseInt(oneDayChange.confirmed)
            )}
          </Text>
        </View>
      </View>
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <View style={styles.cardInnerSection1}>
            <Text style={styles.label}>Recovered</Text>
            {/* <Image style={styles.userCircle} src="/image/user-circle-solid.png" /> */}
          </View>
          <Text style={styles.value}>
            {numberWithCommas(
              parseInt(cummulative.recovered) + parseInt(oneDayChange.recovered)
            )}
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardInnerSection1}>
            <Text style={styles.label}> Deceased</Text>
            {/* <Image style={styles.userCircle} src="/image/user-circle-solid.png" /> */}
          </View>
          <Text style={styles.value}>
            {numberWithCommas(
              parseInt(cummulative.deceased) + parseInt(oneDayChange.deceased)
            )}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

export default CumStatistics;
