import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";

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

  cardsContainer: {
    padding: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    height: 80,
    width: 182,
    backgroundColor: "#ffefd6",
    display: "flex",
    flexDirection: "column",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    justifyContent: "space-between",
    borderRadius: 4,
  },
  label: {
    fontSize: 8,
  },
  value: {
    fontSize: 9,
    fontFamily: "Poppins",
    fontStyle: "SemiBold",
    color: "#236994",
  },
  cardInnerSection1: {
    textAlign: "center",
    justifyContent: "center",
    height: 20,
    fontFamily: "Poppins",
    fontStyle: "SemiBold",
    backgroundColor: "#F4EAD2",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    padding: 2,
    wordBreak: "break-all",
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardInnerSection2: {
    height: 70,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: 7,
  },
  bedInfoWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bedLabel: {
    fontSize: 8,
    // color: "#02075D",
    fontFamily: "Poppins",
    fontStyle: "SemiBold",
  },
});
const Br = () => "\n";

const BedStatistics = ({ bedInfo }) => (
  <View style={styles.container}>
    <View style={styles.headingContainer}>
      <Text style={styles.headingText}>BED AVAILABILITY </Text>
    </View>
    <View style={styles.bodyContainer}>
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <View style={styles.cardInnerSection1}>
            <Text style={styles.label}>Dedicated Covid Hospitals</Text>
          </View>
          <View style={styles.cardInnerSection2}>
            <View style={styles.bedInfoWrapper}>
              <Text style={styles.bedLabel}> ICU Beds</Text>
              <Text style={styles.value}>{bedInfo.dchicubeds || 0}</Text>
            </View>
            <View style={styles.bedInfoWrapper}>
              <Text style={styles.bedLabel}> O2 Beds</Text>
              <Text style={styles.value}>{bedInfo.dcho2beds || 0}</Text>
            </View>
            <View style={styles.bedInfoWrapper}>
              <Text style={styles.bedLabel}> Non O2 Beds</Text>
              <Text style={styles.value}>{bedInfo.dchnono2beds || 0}</Text>
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardInnerSection1}>
            <Text style={styles.label}>Dedicated Covid Health Centres</Text>
          </View>
          <View style={styles.cardInnerSection2}>
            <View style={styles.bedInfoWrapper}>
              <Text style={styles.bedLabel}> ICU Beds</Text>
              <Text style={styles.value}>{bedInfo.dchcicubeds || 0}</Text>
            </View>
            <View style={styles.bedInfoWrapper}>
              <Text style={styles.bedLabel}> O2 Beds</Text>
              <Text style={styles.value}>{bedInfo.dchco2beds || 0}</Text>
            </View>
            <View style={styles.bedInfoWrapper}>
              <Text style={styles.bedLabel}> Non O2 Beds</Text>
              <Text style={styles.value}>{bedInfo.dchcnono2beds || 0}</Text>
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardInnerSection1}>
            <Text style={styles.label}>Covid Care Centres</Text>
          </View>
          <View style={styles.cardInnerSection2}>
            <View style={styles.bedInfoWrapper}>
              <Text style={styles.bedLabel}> O2 Beds</Text>
              <Text style={styles.value}>{bedInfo.ccco2beds || 0}</Text>
            </View>
            <View style={styles.bedInfoWrapper}>
              <Text style={styles.bedLabel}>Non O2 Beds</Text>
              <Text style={styles.value}>{bedInfo.cccnono2beds || 0}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default BedStatistics;
