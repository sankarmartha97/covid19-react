import React from "react";
import { Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { numberWithCommas } from "../../utils/numberComma";

import fonts from "./fontRegisterJson";
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
    width: 85,
    backgroundColor: "#ffefd6",
    display: "flex",
    flexDirection: "column",
    padding: 6,
    justifyContent: "space-between",
    borderRadius: 4,
  },
  label: {
    fontSize: 8,
    // color: "#02075D",
    fontFamily: "Poppins",
    fontStyle: "SemiBold",
  },
  value: {
    fontSize: 9,
    fontFamily: "Poppins",
    fontStyle: "SemiBold",
    color: "#ed1212",
  },
  cardInnerSection1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

const DailyStatistics = ({ daily }) => (
  <View style={styles.container}>
    <View style={styles.headingContainer}>
      <Text style={styles.headingText}>DAILY COVID STATISTICS </Text>
    </View>
    <View style={styles.bodyContainer}>
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <View style={styles.cardInnerSection1}>
            <Text style={styles.label}>Tests Done</Text>
            {/* <Image style={styles.userCircle} src="/image/user-circle-solid.png" /> */}
          </View>
          <Text style={styles.value}>
            {numberWithCommas(parseInt(daily.dtest) + parseInt(daily.ctest)) ||
              0}
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardInnerSection1}>
            <Text style={styles.label}>New Cases</Text>
            {/* <Image style={styles.userCircle} src="/image/user-circle-solid.png" /> */}
          </View>
          <Text style={styles.value}>
            {numberWithCommas(parseInt(daily.positive)) || 0}
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardInnerSection1}>
            <Text style={styles.label}>Positivity</Text>
            {/* <Image style={styles.userCircle} src="/image/user-circle-solid.png" /> */}
          </View>
          <Text style={styles.value}>
            {parseInt(daily.dtest) + parseInt(daily.ctest)
              ? (parseInt(daily.positive) /
                  (parseInt(daily.dtest) + parseInt(daily.ctest))) *
                100
                ? (
                    (parseInt(daily.positive) /
                      (parseInt(daily.dtest) + parseInt(daily.ctest))) *
                    100
                  ).toFixed(2)
                : 0
              : 0}
            %
          </Text>
        </View>
      </View>
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <View style={styles.cardInnerSection1}>
            <Text style={styles.label}>Deceased</Text>
            {/* <Image style={styles.userCircle} src="/image/user-circle-solid.png" /> */}
          </View>
          <Text style={styles.value}>
            {numberWithCommas(parseInt(daily.deceased)) || 0}
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardInnerSection1}>
            <Text style={styles.label}>Discharged</Text>
            {/* <Image style={styles.userCircle} src="/image/user-circle-solid.png" /> */}
          </View>
          <Text style={styles.value}>
            {numberWithCommas(parseInt(daily.cured)) || 0}
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardInnerSection1}>
            <Text style={styles.label}>Active Cases</Text>
            {/* <Image style={styles.userCircle} src="/image/user-circle-solid.png" /> */}
          </View>
          <Text style={styles.value}>
            {numberWithCommas(parseInt(daily.active)) || 0}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

export default DailyStatistics;
