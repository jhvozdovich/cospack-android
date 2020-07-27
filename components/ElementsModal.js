import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, TextInput } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default class ElementsModal extends React.Component {
  state = {
    cosplay: this.props.cosplayList.cosplay,
    color: this.props.cosplayList.color,
    elements: this.props.cosplayList.elements
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
    const elementsCount = this.state.elements.length
    const completeCount = this.state.elements.filter(element => element.completed).length

    return (
      <View >
        <TouchableOpacity style={{ postion: "absolute", padding: 10 }} onPress={this.props.closeElementsModal}>
          <AntDesign name="close" size={24} color={palette.green4} />
        </TouchableOpacity>
        <SafeAreaView style={styles.container} style={{ marginTop: 10, marginHorizontal: 30 }} >
          <Text style={[styles.title, { borderBottomColor: this.state.color }]}>{this.state.cosplay}</Text>
          <Text>{completeCount} of {elementsCount}</Text>
          <View style={{ paddingVertical: 32 }}>
            {
              this.state.elements.map((element) =>
                <View style={styles.listContainer}>
                  <TouchableOpacity>
                    <Ionicons name={element.completed ? "ios-square" : "ios-square-outline"} size={24} color={"grey"} style={{ width: 32 }} />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 20, color: element.completed ? "darkgrey" : "black" }}>{element.name}</Text>
                </View>)
            }
          </View>


          {/* Troubleshoot keyboard avoiding */}
          <KeyboardAvoidingView >
            <TextInput style={[styles.input, { borderColor: this.state.color }]} />
            <TouchableOpacity style={{ alignSelf: "center" }} onPress={this.createCosplay} >
              <Text style={[styles.input, { backgroundColor: this.state.color, fontWeight: "bold", color: "white", paddingTop: 10 }]}>
                + Add Element
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  title: {
    color: "grey",
    fontSize: 40,
    borderBottomWidth: 3,
    paddingVertical: 5,
    paddingHorizontal: "20%",
    marginBottom: 15
  },
  input: {
    borderWidth: 1,
    borderColor: palette.green1,
    borderRadius: 6,
    height: 50,
    marginTop: 20,
    marginHorizontal: 30,
    textAlign: "center",
    fontSize: 18,
    width: 300,
    alignSelf: "center",
  },
  listContainer: {
    paddingVertical: 8,
    flexDirection: "row"
  }
})