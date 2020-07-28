import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import palette from "../palette";
import CosplayControl from './CosplayControl';
import EventsControl from "./EventsControl";

export default function Home() {

  const [cosplaysVisible, toggleCosplays] = useState(false);
  const [eventsVisible, toggleEvents] = useState(false);

  if (cosplaysVisible) {
    return <CosplayControl cosplaysVisible={cosplaysVisible} toggleCosplays={() => toggleCosplays()} />
  } else if (eventsVisible) {
    return <EventsControl eventsVisible={eventsVisible} toggleEvents={() => toggleEvents()} />
  } else {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={[styles.title]}>
            Cos<Text style={{ fontWeight: "normal", color: palette.green3 }}>Pack</Text>
          </Text>
        </View>
        <TouchableOpacity onPress={toggleCosplays}>
          <Text style={[styles.input, styles.button, { backgroundColor: palette.green4 }]}>
            Cosplays
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleEvents}>
          <Text style={[styles.input, styles.button, { backgroundColor: palette.green2 }]}>
            Events
          </Text>
        </TouchableOpacity>
      </View >
    )
  }
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