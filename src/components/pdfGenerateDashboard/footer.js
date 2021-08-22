import React from "react";
import { Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import fonts from "./fontRegisterJson";

const HEADING_COLOR = "#680707";
Font.register(fonts);

const styles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    backgroundColor: "#F4EAD2",
    height: 80,
    paddingHorizontal: 15,
    paddingTop: 5,
    paddingBottom: 5,
    display: "flex",
    flexDirection: "row",
    bottom: 0,
    width: "100%",
    justifyContent: "space-between",
  },
  logoPretext: {
    color: HEADING_COLOR,
    fontSize: 8,
    fontFamily: "Poppins",
    fontStyle: "Light",
  },
  logo: {
    width: 62,
    height: 62,
    alignSelf: "center",
  },
  mailImage: {
    width: 10,
    height: 10,
    marginRight: 4,
  },
  contactWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  headingContainer: {
    borderLeft: "1px solid #680707",
    marginLeft: 8,
    paddingHorizontal: 5,
    paddingBottom: 5,
    paddingTop: 7,
    display: "flex",
    flexDirection: "column",
    //   border: '1px solid black',
    justifyContent: "space-between",
  },
  Heading: {
    color: HEADING_COLOR,
    fontSize: 10,
  },
  subHeading: {
    color: HEADING_COLOR,
    fontSize: 8,
    fontFamily: "Poppins",
    fontStyle: "Light",
  },
  dateContainer: {
    display: "flex",
    flexDirection: "column",
    // border: '1px solid black',
    width: 270,
    justifyContent: "flex-end",
  },
  date: {
    fontSize: 9,
    color: HEADING_COLOR,
    alignSelf: "flex-end",
    paddingBottom: 5,
    fontFamily: "Poppins",
    fontStyle: "italic",
  },
  wrapper1: {
    display: "flex",
    flexDirection: "row",
  },
  qrcodetextWrapper: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 7,
    paddingLeft: 4,
    paddingBottom: 8,
    justifyContent: "space-between",
  },
  link: {
    fontFamily: "Poppins",
    fontStyle: "italic",
  },
});
const Footer = () => (
  <View style={styles.footerContainer}>
    <View style={styles.wrapper1}>
      <Image style={styles.logo} src="/image/qr_code.png" />
      <view style={styles.qrcodetextWrapper}>
        <view>
          <Text style={styles.logoPretext}>Scan QR Code</Text>
          <Text style={styles.logoPretext}>
            or visit our web portal at{" "}
            <Text style={styles.link}>
              www.statecontrolroom.arunachal.gov.in
            </Text>
          </Text>
        </view>
        <Text style={styles.Heading}>
          State Control Room, Government of Arunachal Pradesh
        </Text>
      </view>
    </View>

    <View style={styles.headingContainer}>
      <View style={styles.headingContainer1}>
        <View style={styles.contactWrapper}>
          <Image style={styles.mailImage} src="/image/emailcolor.png" />
          <Text style={styles.subHeading}>infoccritanagar@gmail.com</Text>
        </View>
        <View style={styles.contactWrapper}>
          <Image style={styles.mailImage} src="/image/callcolor.png" />
          <Text style={styles.subHeading}>+91 603 385 6466</Text>
        </View>
      </View>
      {/*<Text style={styles.Heading}>State Control Room, Government of Arunachal Pradesh</Text>
       */}
    </View>
    {/* <View style={styles.dateContainer}>
               <Text style={styles.date}>9th August 2021</Text>
            </View>*/}
  </View>
);

export default Footer;
