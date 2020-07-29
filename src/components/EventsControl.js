import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import palette from "../palette";

export default function EventsControl(props) {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={[styles.title, { fontSize: 40 }]}>Coming Soon!</Text>
      </View>
      <TouchableOpacity onPress={props.toggleEvents}>
        <Text style={[styles.input, styles.button, { backgroundColor: palette.green2 }]}>
          Back
          </Text>
      </TouchableOpacity>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 50,
    margin: 30
  },
  input: {
    borderWidth: 1,
    borderColor: palette.green1,
    borderRadius: 6,
    height: 50,
    marginTop: 20,
    marginHorizontal: 30,
    textAlign: "center",
    fontSize: 18
  },
  button: {
    fontWeight: "bold",
    color: "white",
    paddingTop: 10
  }
});