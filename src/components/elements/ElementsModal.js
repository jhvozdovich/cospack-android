import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, FlatList, TextInput, Keyboard, Animated } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default class ElementsModal extends React.Component {
  state = {
    elementLists: [],
    newElement: "",
    loading: true
  }

  componentDidMount() {
    firebase = new Firebase((error) => {
      if (error) {
        return alert(`Something went wrong D: ${error}`)
      }

      firebase.getElements(elementLists => {
        this.setState({ elementLists }, () => {
          this.setState({ loading: false })
        })
      })
    });
  }

  componentWillUnmount() {
    firebase.detach();
  }

  toggleCompletedElement = index => {
    elementList[index].elementCompleted = !elementList.elementCompleted
    this.props.updateElementInDatabase(elementList);
  }

  addElement = () => {
    this.props.addElementToDatabase(this.state.newElement);
    this.setState({ newElement: "" })
    Keyboard.dismiss();
  }

  render() {
    const cosplayList = this.props.cosplayList
    const elementList = this.props.elementList
    const elementsCount = elementList.length
    const completeCount = elementList.filter(element => element.elementCompleted).length

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
            <FlatList
              data={elementList}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.listContainer}>
                    <TouchableOpacity onPress={() => this.toggleCompletedElement(index)}>
                      <Ionicons name={item.elementCompleted ? "ios-square" : "ios-square-outline"} size={24} color={"grey"} style={{ width: 32 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, color: item.elementCompleted ? "darkgrey" : "black" }}>{item.elementName}</Text>
                  </View>
                )
              }}
            />
          </View>
        </SafeAreaView>


        {/* Troubleshoot keyboard avoiding */}
        <SafeAreaView style={styles.container} style={{ marginTop: 10, marginHorizontal: 30 }} >
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

      </KeyboardAvoidingView >
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