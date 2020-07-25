import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import palette from './palette';
import tempData from "./tempData";
import CosplayList from "./components/CosplayList";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container} >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>
            Cos<Text style={{ fontWeight: "normal", color: palette.green3 }}>Pack</Text>
          </Text>
        </View>

        <View style={{}}>
          <TouchableOpacity>
            <Text style={styles.button}>+ Add Cosplay</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 100, margin: 20 }}>
          <FlatList
            data={tempData}
            keyExtractor={item => item.cosplay}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            renderItem={({ item }) => (

              <CosplayList cosplayList={item} />

            )} />
        </View>
      </View>
    );
  }
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
  button: {
    color: "grey",
    fontSize: 20
  }
});
