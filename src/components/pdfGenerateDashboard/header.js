import React from "react";
import { Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import fonts from "./fontRegisterJson";
import moment from "moment";
const HEADING_COLOR = "#680707";
Font.register(fonts);

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#F4EAD2",
    height: 60,
    paddingHorizontal: 15,
    paddingTop: 5,
    paddingBottom: 5,
    display: "flex",
    flexDirection: "row",
  },
  logo: {
    width: 90,
  },
  headingContainer: {
    paddingHorizontal: 5,
    paddingBottom: 5,
    paddingTop: 5,
    display: "flex",
    flexDirection: "column",
    //   border: '1px solid black',
    justifyContent: "space-between",
  },
  mainHeading: {
    color: HEADING_COLOR,
    fontSize: 18,
    fontFamily: "Poppins",
    fontStyle: "bold",
  },
  subHeading: {
    color: HEADING_COLOR,
    fontSize: 13,
  },
  dateContainer: {
    display: "flex",
    flexDirection: "column",
    // border: '1px solid black',
    width: 270,
    justifyContent: "flex-end",
  },
  datePrefix: {
    fontSize: 9,
    color: HEADING_COLOR,
    alignSelf: "flex-end",
    paddingBottom: 5,
  },

  date: {
    fontSize: 9,
    color: HEADING_COLOR,
    alignSelf: "flex-end",
    paddingBottom: 5,
    fontFamily: "Poppins",
    fontStyle: "italic",
  },
});
const Header = () => (
  <View style={styles.headerContainer}>
    <Image style={styles.logo} src="/image/logo_hq.png" />
    <View style={styles.headingContainer}>
      <Text style={styles.mainHeading}>State Control Room</Text>
      <Text style={styles.subHeading}>Government of Arunachal Pradesh</Text>
    </View>
    <View style={styles.dateContainer}>
      <Text style={styles.datePrefix}>Report Generated on</Text>
      <Text style={styles.date}>
        {moment(Date.now()).format("Do MMMM YYYY")}{" "}
        {moment(Date.now()).format("h:mm A")}
      </Text>
    </View>
  </View>
);

export default Header;
