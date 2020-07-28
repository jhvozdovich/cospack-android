import { StatusBar } from 'expo-status-bar';
import React from 'react';
import CosplayControl from "./CosplayControl";

export default function Home() {
  return (
    <View>
      <Text>User: {this.state.user.uid}</Text>
    </View>
    <View style={{ flexDirection: "row" }}>
      <Text style={styles.title}>
        Cos<Text style={{ fontWeight: "normal", color: palette.green3 }}>Pack</Text>
      </Text>
    </View>
  )
}