import React from "react";
import { Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
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
    backgroundColor: "#ffefd6",
    display: "flex",
    flexDirection: "column",
    padding: 4,
    justifyContent: "space-between",
    borderRadius: 4,
  },
  label: {
    fontSize: 8,
    // fontSize: 9,
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
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
const Br = () => "\n";
const BehaviourStatistics = ({ covidBehaviourData }) =>
  covidBehaviourData ? (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>COVID INAPPROPRIATE BEHAVIOUR</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <View style={styles.cardInnerSection1}>
              <Text style={styles.label}>Violations Today</Text>
              {/* <Image style={styles.userCircle} src="/image/user-circle-solid.png" /> */}
            </View>
            <Text style={styles.value}>
              {covidBehaviourData.vcase
                ? numberWithCommas(parseInt(covidBehaviourData.vcase))
                : 0}
            </Text>
          </View>
          <View style={styles.card}>
            <View style={styles.cardInnerSection1}>
              <Text style={styles.label}>
                Fine Imposed for Violations <Br /> Today
              </Text>
              {/* <Image style={styles.userCircle} src="/image/user-circle-solid.png" /> */}
            </View>
            <Text style={styles.value}>
              Rs.{" "}
              {covidBehaviourData.fine
                ? numberWithCommas(parseInt(covidBehaviourData.fine))
                : 0}
            </Text>
          </View>
        </View>
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <View style={styles.cardInnerSection1}>
              <Text style={styles.label}>Cumulative Violations</Text>
              {/* <Image style={styles.userCircle} src="/image/user-circle-solid.png" /> */}
            </View>
            <Text style={styles.value}>
              {covidBehaviourData.cvcase
                ? numberWithCommas(parseInt(covidBehaviourData.cvcase))
                : 0}
            </Text>
          </View>
          <View style={styles.card}>
            <View style={styles.cardInnerSection1}>
              <Text style={styles.label}>
                Cumulative Fine Imposed for <Br /> Violations
              </Text>
              {/* <Image style={styles.userCircle} src="/image/user-circle-solid.png" /> */}
            </View>
            <Text style={styles.value}>
              Rs.{" "}
              {covidBehaviourData.cfine
                ? numberWithCommas(parseInt(covidBehaviourData.cfine))
                : 0}
            </Text>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <Text>No Data</Text>
  );

export default BehaviourStatistics;
