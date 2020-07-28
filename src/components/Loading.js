import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

let randomTipIndex = Math.floor(Math.random() * 4);
const randomTipArray = ["Take a sip of water!", "Do a minute of quick exercise!", "Take a snack break!",
  "Do you have to go potty!? Go now!!!"]



export default function Loading() {

  randomTipIndex = Math.floor(Math.random() * 4);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Cos<Text style={{ fontWeight: "normal", color: palette.green3 }}>Pack</Text>
      </Text>
      <Text>{randomTipArray[randomTipIndex]}</Text>
      <ActivityIndicator size="large" color={palette.green2} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 50,
    margin: 30
  },
});