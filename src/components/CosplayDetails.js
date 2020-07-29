import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default class CosplayDetails extends React.Component {
  state = {
    newCosplay: this.props.cosplayList.cosplay,
    newSeries: this.props.cosplayList.series,
    cosplayDetailsVisible: false,
  }

  deleteAlert = () => {
    Alert.alert('WARNING', `Are you sure you want to delete ${this.props.cosplayList.cosplay} from CosPack?`, [
      { text: "OK", onPress: () => this.deleteCosplayDatabase(this.props.cosplayList) },
      { text: "Cancel" }
    ],
      { cancelable: true });
  }

  deleteCosplayDatabase = cosplay => {
    this.props.toggleCosplayDetailsVisible();
    this.props.closeElementsModal();
    firebase.deleteCosplayFromDatabase(cosplay);
  }

  updateCosplay = () => {
    let cosplayList = this.props.cosplayList;
    cosplayList.cosplay = this.state.newCosplay;
    cosplayList.series = this.state.newSeries;
    this.props.updateCosplayDatabase(cosplayList)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <TouchableOpacity style={{ postion: "absolute", padding: 10 }} onPress={this.props.toggleCosplayDetailsVisible}>
            <AntDesign name="back" size={32} color={this.props.cosplayList.color} />
          </TouchableOpacity>
          <TouchableOpacity style={{ postion: "absolute", left: 250, padding: 10 }} onPress={() => this.deleteAlert()}>
            <AntDesign name="delete" size={32} color={this.props.cosplayList.color} />
          </TouchableOpacity>
        </View>
        <View style={[{ marginTop: 10, marginHorizontal: 30, flex: 3 }]} >
          <View style={{ alignItems: "center", borderBottomWidth: 3, borderBottomColor: this.props.cosplayList.color }}>
            <Text style={[styles.title]}>{this.props.cosplayList.cosplay}</Text>
          </View>
        </View>
        <View style={{ flex: 12, marginHorizontal: 20 }}>
          <View style={styles.inputBox}>
            <Text style={styles.font}>Name:</Text>
            <TextInput
              style={[styles.input, { borderColor: this.props.cosplayList.color }]}
              onChangeText={textCosplay => this.setState({ newCosplay: textCosplay })}
              value={(this.state.newCosplay)} placeholder={this.props.cosplayList.cosplay} placeholderTextColor="black" />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.font}>Series:</Text>
            <TextInput
              style={[styles.input, { borderColor: this.props.cosplayList.color }]}
              onChangeText={textSeries => this.setState({ newSeries: textSeries })}
              value={(this.state.newSeries)} placeholder={this.props.cosplayList.series} placeholderTextColor="black" />
          </View>

          <Text> Color: {this.props.cosplayList.color}</Text>
        </View>
        <View style={{ flex: 2 }} >
          <TouchableOpacity style={{ alignSelf: "center" }}
            onPress={() => this.updateCosplay()} >
            <Text style={[styles.button, styles.font, {
              backgroundColor: this.props.cosplayList.color,
              fontWeight: "bold", color: "white",
            }]}>
              Update
                  </Text>
          </TouchableOpacity>
        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "grey",
    fontSize: 40,
    marginBottom: 10,
    fontWeight: "bold",
    paddingHorizontal: 5,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 6
  },
  input: {
    borderWidth: 1,
    borderColor: palette.green1,
    borderRadius: 6,
    height: 40,
    width: 250,
    marginHorizontal: 10,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "rgba(255, 255, 255, 0.7)"
  },
  button: {
    fontWeight: "bold",
    color: "white",
    padding: 10,
    borderRadius: 6
  },
  font: {
    marginTop: 5,
    fontSize: 20
  },
  inputBox: {
    flexDirection: "row",
    marginTop: 15
  }
});