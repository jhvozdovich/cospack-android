import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import ElementsModal from "./ElementsModal";

export default class CosplayList extends React.Component {
  state = {
    showCosplayListVisible: false
  }
  toggleCosplayListModal() {
    this.setState({ showCosplayListVisible: !this.state.showCosplayListVisible })
  }

  render() {
    const cosplayList = this.props.cosplayList
    // const percentComplete = cosplayList.toDos.filter(todo => todo.completed).length / (cosplayList.toDos.length)
    return (
      <View>
        <Modal animationType="slide" visible={this.state.showCosplayListVisible} onRequestClose={() => this.toggleCosplayListModal()}>
          <ElementsModal cosplayList={cosplayList} closeElementsModal={() => this.toggleCosplayListModal()} />
        </Modal>
        <TouchableOpacity style={[styles.container, { backgroundColor: cosplayList.color }]}
          onPress={() => this.toggleCosplayListModal()}>
          <Text style={styles.cosplays}>{cosplayList.cosplay}</Text>
          <View>
            <View>
              <Text>Percent Complete: 27%(hard coded)</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginHorizontal: 5,
    marginTop: 20,
    alignItems: "center"
  },
  cosplays: {
    color: "white",
    fontWeight: "bold"
  }
})