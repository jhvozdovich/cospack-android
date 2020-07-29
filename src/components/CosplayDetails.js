import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function CosplayDetails(props) {

  const deleteAlert = () => {
    Alert.alert('WARNING', `Are you sure you want to delete ${props.cosplayList.cosplay} from CosPack?`, [
      { text: "OK", onPress: () => deleteCosplayDatabase(props.cosplayList) },
      { text: "Cancel" }
    ],
      { cancelable: true });
  }

  const deleteCosplayDatabase = cosplay => {
    props.toggleCosplayDetailsVisible();
    props.closeElementsModal();
    firebase.deleteCosplayFromDatabase(cosplay);
  }

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ postion: "absolute", padding: 10 }} onPress={props.toggleCosplayDetailsVisible}>
          <AntDesign name="back" size={32} color={props.cosplayList.color} />
        </TouchableOpacity>
        <TouchableOpacity style={{ postion: "absolute", left: 250, padding: 10 }} onPress={deleteAlert}>
          <AntDesign name="delete" size={32} color={props.cosplayList.color} />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={[styles.title]}>
          Details Page!
      </Text>
      </View>
    </View>

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