import React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  image: {
    height: 200,
  },
});

const StateChart = ({ stateChartImageUrl }) => (
  <View>
    {stateChartImageUrl ? (
      <Image src={stateChartImageUrl} style={styles.image} />
    ) : (
      <Text>No Image</Text>
    )}
  </View>
);
export default StateChart;
