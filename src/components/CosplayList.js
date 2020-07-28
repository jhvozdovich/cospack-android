import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, InteractionManager, ImageBackground } from "react-native";
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
    const percentComplete = Math.floor((cosplayList.elements.filter(element => element.elementCompleted).length / (cosplayList.elements.length)) * 100)
    return (
      <View style={{ flex: 1, height: 200, marginBottom: 10 }} >
        <Modal animationType="slide" visible={this.state.showCosplayListVisible} onRequestClose={() => this.toggleCosplayListModal()}>
          <ElementsModal
            cosplayList={cosplayList}
            closeElementsModal={() => this.toggleCosplayListModal()}
            updateCosplayDatabase={this.props.updateCosplayDatabase} />
        </Modal>
        <TouchableOpacity onPress={() => this.toggleCosplayListModal()} >
          <ImageBackground source={{ uri: cosplayList.image }} style={[styles.container, { backgroundColor: cosplayList.image ? null : cosplayList.color, height: "100%" }]} >
            <Text style={styles.cosplays}>{cosplayList.cosplay}</Text>
            <View>
              <View>
                <Text>Percent Complete: {percentComplete} %</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity >

      </ View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    marginHorizontal: 5,
    alignItems: "center",
    overflow: "hidden"
  },
  cosplays: {
    color: "white",
    fontWeight: "bold"
  }
})