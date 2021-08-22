import React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
// import styled from '@emotion/styled';

const styles = StyleSheet.create({
  image: {},
});

const DistrictChart = ({ districtChartImageUrl }) => (
  <View>
    {districtChartImageUrl ? (
      <Image src={districtChartImageUrl} style={styles.image} />
    ) : (
      <Text>No Image</Text>
    )}
  </View>
);

export default DistrictChart;
