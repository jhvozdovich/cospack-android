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
    const calculateComplete = () => {
      const result = Math.floor((cosplayList.elements.filter(element => element.elementCompleted).length / (cosplayList.elements.length)) * 110);
      if (isNaN(cosplayList.elements.length) || isNaN(result)) {
        return 0
      } else {
        return result
      }
    }
    const widthPercentageComplete = calculateComplete();

    return (
      <View style={{ flex: 1, height: 200, marginBottom: 10 }} >
        <Modal animationType="slide" visible={this.state.showCosplayListVisible} onRequestClose={() => this.toggleCosplayListModal()}>
          <ElementsModal
            cosplayList={cosplayList}
            closeElementsModal={() => this.toggleCosplayListModal()}
            updateCosplayDatabase={this.props.updateCosplayDatabase} />
        </Modal>

        <TouchableOpacity onPress={() => this.toggleCosplayListModal()} >

          <ImageBackground source={{ uri: cosplayList.imagePrev ? cosplayList.imagePrev : cosplayList.image }} style={[styles.container, { backgroundColor: cosplayList.image ? null : cosplayList.color, height: "100%", alignItems: "center" }]} >
            <View style={[styles.overlay, { width: "110%", left: `${widthPercentageComplete}%` }]} />
            <Text adjustsFontSizeToFit flexWrap="wrap"
              style={[styles.cosplays,
              { paddingTop: cosplayList.cosplay.length > 6 ? 50 : 10 }]}>
              {cosplayList.cosplay}
            </Text>
          </ImageBackground>

        </TouchableOpacity >

      </ View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    alignItems: "center",
    overflow: "hidden"
  },
  cosplays: {
    color: "white",
    fontWeight: "bold",
    fontSize: 500,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    textShadowColor: '#000',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
})