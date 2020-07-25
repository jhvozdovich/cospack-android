import React from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import palette from "../palette";
import { Colors } from "react-native/Libraries/NewAppScreen";
import tempData from "../tempData";
import CosplayList from "./CosplayList";

export default class CreateCosplayForm extends React.Component {
  colorOptions = ["#BBF1F1", "#89D5D2", "#35B5AC", "#008085", "#BBF1F7", "#89D5D8", "#35B5AA", "#008089"]
  state = {
    cosplay: "",
    series: "",
    color: this.colorOptions[0]
  }

  renderColors() {
    return this.colorOptions.map(color => (
      <TouchableOpacity key={color} style={[styles.colorSelect, { backgroundColor: color }]} onPress={() => this.setState({ color: color })} />
    ))
  }

  createCosplay = () => {
    const { cosplay, series, color } = this.state
    tempData.push({
      cosplay,
      color,
      series
    })
    this.setState({
      cosplay: "",
      series: "",
      color: this.colorOptions[0]
    })
    this.props.closeForm();
  }
  render() {
    return (
      <KeyboardAvoidingView >
        <TouchableOpacity style={{ postion: "absolute", padding: 10 }} onPress={this.props.closeForm}>
          <AntDesign name="close" size={24} color={palette.green4} />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>Add New Cosplay</Text>
          <TextInput style={styles.input} placeholder="Cosplay" onChangeText={text => this.setState({ cosplay: text })} />
          <TextInput style={styles.input} placeholder="Series" onChangeText={text => this.setState({ series: text })} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {this.renderColors()}
        </View>
        <TouchableOpacity onPress={this.createCosplay} >
          <Text style={[styles.input, { backgroundColor: this.state.color, fontWeight: "bold", color: "white", paddingTop: 10 }]}>
            Create
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView >
    )
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: "grey",
    fontSize: 20
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
  colorSelect: {
    width: 35,
    height: 35,
    marginTop: 20,
    marginHorizontal: 5,
    borderRadius: 6
  }
})