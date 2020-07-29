import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

let randomTipIndex
const randomTipArray = ["Take a sip of water!", "Do a minute of quick exercise!", "Take a snack break!",
  "Do you have to go potty!? Go now!!!", "Hydrate or diedrate!", "Wash your face and refresh!",
  "Check your posture <3", "Comparison is the thief of joy <3", "Make time to sleep tonight!",
  "Be kind to yourself!", "Phone a friend and work together!", "Breathe in, breathe out <3",
  "Remember sunscreen!"]



export default function Loading() {

  randomTipIndex = Math.floor(Math.random() * 13);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Cos<Text style={{ fontWeight: "normal", color: palette.green3 }}>Pack</Text>
      </Text>
      <View style={{ width: 200, height: 200 }}>
        <Image source={require("./../../public/DolphinIcon.png")}
          style={{ width: 200, height: 200, marginVertical: 10 }} />
      </View>
      <Text style={{ fontSize: 20, marginVertical: 20, fontWeight: "bold", color: "grey" }}>
        {randomTipArray[randomTipIndex]}
      </Text>
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
    marginTop: 30
  },
});