import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, TextInput, Keyboard } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default class ElementsModal extends React.Component {
  state = {
    newElement: ""
  }

  toggleCompletedElement = index => {
    let cosplayList = this.props.cosplayList
    cosplayList.elements[index].completed = !cosplayList.elements[index].completed
    this.props.updateCosplayList(cosplayList);
  }

  addElement = () => {
    let cosplayList = this.props.cosplayList
    cosplayList.elements.push({ name: this.state.newElement, completed: false })
    this.props.updateCosplayList(cosplayList)
    this.setState({ newElement: "" })
    Keyboard.dismiss();
  }

  render() {
    const cosplayList = this.props.cosplayList
    const elementsCount = cosplayList.elements.length
    const completeCount = cosplayList.elements.filter(element => element.completed).length

    return (
      // Troubleshoot keyboard avoiding views
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <TouchableOpacity style={{ postion: "absolute", padding: 10 }} onPress={this.props.closeElementsModal}>
          <AntDesign name="close" size={24} color={palette.green4} />
        </TouchableOpacity>
        <SafeAreaView style={styles.container} style={{ marginTop: 10, marginHorizontal: 30 }} >
          <Text style={[styles.title, { borderBottomColor: cosplayList.color }]}>{cosplayList.cosplay}</Text>
          <Text>{completeCount} of {elementsCount}</Text>
          <View style={{ paddingVertical: 32 }}>
            {
              cosplayList.elements.map((element, index) =>
                <View style={styles.listContainer}>
                  <TouchableOpacity onPress={() => this.toggleCompletedElement(index)}>
                    <Ionicons name={element.completed ? "ios-square" : "ios-square-outline"} size={24} color={"grey"} style={{ width: 32 }} />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 20, color: element.completed ? "darkgrey" : "black" }}>{element.name}</Text>
                </View>)
            }
          </View>


          {/* Troubleshoot keyboard avoiding */}
          <View>
            <TextInput
              style={[styles.input, { borderColor: cosplayList.color }]} onChangeText={text => this.setState({ newElement: text })}
              value={(this.state.newElement)} />
            <TouchableOpacity style={{ alignSelf: "center" }}
              onPress={() => this.addElement()} >
              <Text style={[styles.input, { backgroundColor: cosplayList.color, fontWeight: "bold", color: "white", paddingTop: 10 }]}>
                + Add Element
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
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