import React from "react";
import { View, StyleSheet, Image, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: 4,
  },
});

const MapPrint = ({ mapImageUrl }) => (
  <View>
    {mapImageUrl ? (
      <Image src={mapImageUrl} style={styles.image} />
    ) : (
      <Text>No Image</Text>
    )}
  </View>
);

export default MapPrint;
