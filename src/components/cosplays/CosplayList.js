import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import ElementsModal from "../elements/ElementsModal";

export default class CosplayList extends React.Component {
  state = {
    elementListVisible: false
  }
  toggleElementListModal() {
    this.setState({ elementListVisible: !this.state.elementListVisible })
  }

  render() {
    const cosplayList = this.props.cosplayList
    const elementList = this.props.elementList
    const percentComplete = Math.floor((elementList.filter(element => element.elementCompleted).length / (elementList.length)) * 100)
    return (
      <View>
        <Modal animationType="slide" visible={this.state.elementListVisible} onRequestClose={() => this.toggleCosplayListModal()}>
          <ElementsModal
            cosplayList={cosplayList}
            elementList={elementList}
            closeElementsModal={() => this.toggleElementListModal()}
            updateElementInDatabase={this.props.updateElementInDatabase} />
        </Modal>
        <TouchableOpacity style={[styles.container, { backgroundColor: cosplayList.color }]}
          onPress={() => this.toggleCosplayListModal()}>
          <Text style={styles.cosplays}>{cosplayList.cosplay}</Text>
          <View>
            <View>
              <Text>Percent Complete: {percentComplete} %</Text>
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