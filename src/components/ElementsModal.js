import React from "react";
import { v4 } from "uuid";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, FlatList, TextInput, Keyboard, Image, ImageBackground } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CosplayDetails from "./CosplayDetails";

export default class ElementsModal extends React.Component {
  state = {
    newElement: "",
    cosplayDetailsVisible: false,
  }
  toggleCompletedElement = index => {
    let cosplayList = this.props.cosplayList
    cosplayList.elements[index].elementCompleted = !cosplayList.elements[index].elementCompleted
    this.props.updateCosplayDatabase(cosplayList);
  }

  addElement = () => {
    let cosplayList = this.props.cosplayList
    if (this.state.newElement.length > 0) {
      cosplayList.elements.push({ elementName: this.state.newElement, elementCompleted: false, id: v4(), cosplayId: this.props.cosplayList.id })
      this.props.updateCosplayDatabase(cosplayList)
      this.setState({ newElement: "" })
      Keyboard.dismiss(); ''
    }
  }

  toggleCosplayDetailsVisible = () => {
    this.setState({ cosplayDetailsVisible: !this.state.cosplayDetailsVisible })
  }

  render() {
    const cosplayList = this.props.cosplayList
    const elementsCount = cosplayList.elements.length
    const completeCount = cosplayList.elements.filter(element => element.elementCompleted).length

    if (this.state.cosplayDetailsVisible) {
      return <CosplayDetails cosplayDetailsVisible={this.state.cosplayDetailsVisible}
        toggleCosplayDetailsVisible={this.toggleCosplayDetailsVisible}
        cosplayList={this.props.cosplayList}
        closeElementsModal={this.props.closeElementsModal} />
    }
    else {
      return (
        // Troubleshoot keyboard avoiding views
        <View behavior="padding">
          <ImageBackground source={{ uri: cosplayList.image }} style={{ height: "100%" }}  >
            <View style={{ flexDirection: "row", textAlign: "center" }}>
              <TouchableOpacity style={{ postion: "absolute", padding: 10 }} onPress={this.props.closeElementsModal}>
                <AntDesign name="closesquare" size={32} color={cosplayList.color} />
              </TouchableOpacity>
              <TouchableOpacity style={{ postion: "absolute", left: 250, padding: 10 }} onPress={this.toggleCosplayDetailsVisible}>
                <AntDesign name="edit" size={32} color={cosplayList.color} />
              </TouchableOpacity>
            </View>
            <View style={styles.container} style={{ marginTop: 10, marginHorizontal: 30 }} >
              <View style={{ alignItems: "center", borderBottomWidth: 3, borderBottomColor: cosplayList.color }}>
                <Text style={[styles.title]}>{cosplayList.cosplay}</Text>
              </View>
              <Text>{completeCount} of {elementsCount}</Text>
              <View>
                <FlatList
                  data={cosplayList.elements}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={[styles.listContainer,
                      {
                        backgroundColor: item.elementCompleted ? "rgba(0,0,0,0.7)" : "rgba(255, 255, 255, 0.7)",
                        borderRadius: 6
                      }
                      ]}>
                        <TouchableOpacity onPress={() => this.toggleCompletedElement(index)}>
                          <Ionicons
                            name={item.elementCompleted ? "ios-checkbox" : "ios-square"}
                            size={30}
                            color={item.elementCompleted ? cosplayList.color : "rgba(0,0,0, 0.3)"}
                            style={{
                              paddingLeft: 10,
                              paddingRight: item.elementCompleted ? 10 : 13,
                              paddingBottom: 2
                            }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: item.elementCompleted ? "white" : "black" }}>{item.elementName}</Text>
                      </View>
                    )
                  }}
                />
              </View>
            </View>
            <View style={styles.container} style={{ marginTop: 10, marginHorizontal: 30 }} >
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={[styles.input, { borderColor: cosplayList.color, backgroundColor: "rgba(255, 255, 255, 0.7)" }]}
                  onChangeText={text => this.setState({ newElement: text })}
                  value={(this.state.newElement)} />
                <TouchableOpacity style={{ alignSelf: "center" }}
                  onPress={() => this.addElement()} >
                  <Text style={[styles.box, {
                    backgroundColor: cosplayList.color,
                    fontWeight: "bold", color: "white",
                  }]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View >
      )
    }
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
    height: 50,
    marginTop: 20,
    marginHorizontal: 0,
    textAlign: "center",
    fontSize: 18,
    width: 240,
    alignSelf: "center",
    fontWeight: "bold"
  },
  box: {
    borderWidth: 1,
    borderColor: palette.green1,
    borderRadius: 6,
    height: 50,
    marginTop: 20,
    marginHorizontal: 10,
    textAlign: "center",
    alignSelf: "center",
    width: 50,
    fontSize: 35
  },
  listContainer: {
    marginVertical: 8,
    flexDirection: "row"
  }
})