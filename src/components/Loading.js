import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import CosplayControl from "./CosplayControl";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Cos<Text style={{ fontWeight: "normal", color: palette.green3 }}>Pack</Text>
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
    margin: 30
  },
});