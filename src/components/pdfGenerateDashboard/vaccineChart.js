import React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  image: {
    width: "100%",
  },
});

const VaccineChart = ({ vaccineImageUrl }) => (
  <View>
    {vaccineImageUrl ? (
      <Image src={vaccineImageUrl} style={styles.image} />
    ) : (
      <Text>No Image</Text>
    )}
  </View>
);

export default VaccineChart;
