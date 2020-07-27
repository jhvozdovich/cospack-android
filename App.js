import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import palette from './palette';
import tempData from "./tempData";
import CosplayList from "./components/CosplayList";
import CreateCosplayForm from "./components/CreateCosplayForm";

export default class App extends React.Component {
  state = {
    addCosplayVisible: false,
    cosplayLists: tempData
  }

  toggleAddCosplayModal() {
    this.setState({ addCosplayVisible: !this.state.addCosplayVisible })
  }

  renderCosplayList = (cosplayList) => {
    return <CosplayList cosplayList={cosplayList} updateCosplayList={this.updateCosplayList} />
  }

  addCosplayList = cosplay => {
    this.setState({ cosplayLists: [...this.state.cosplayLists, { ...cosplay, id: this.state.cosplayLists.length + 1, elements: [] }] })
  }

  updateCosplayList = cosplay => {
    this.setState({
      cosplayLists: this.state.cosplayLists.map(element => {
        return element.id === cosplay.id ? cosplay : element;
      })
    })
  }

  render() {
    return (
      <View style={styles.container} >
        <Modal animationType="slide"
          visible={this.state.addCosplayVisible}
          onRequestClose={() => this.toggleAddCosplayModal()}>
          <CreateCosplayForm closeForm={() => this.toggleAddCosplayModal()} addCosplayList={this.addCosplayList} />
        </Modal>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>
            Cos<Text style={{ fontWeight: "normal", color: palette.green3 }}>Pack</Text>
          </Text>
        </View>

        <View style={{}}>
          <TouchableOpacity onPress={() => this.toggleAddCosplayModal()}>
            <Text style={styles.button}>+ Add Cosplay</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 300, marginVertical: 20 }}>
          <FlatList
            data={this.state.cosplayLists}
            keyExtractor={item => item.cosplay}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) =>
              this.renderCosplayList(item)} />
        </View>
      </View >
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 50,
    margin: 30
  },
  button: {
    color: "grey",
    fontSize: 20
  }
});
