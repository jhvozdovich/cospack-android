import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import palette from '../palette';
import CosplayList from "./CosplayList";
import CreateCosplayForm from "./CreateCosplayForm";
import Firebase from "../Firebase";
import Loading from "./Loading";

export default class CosplayControl extends React.Component {
  state = {
    addCosplayVisible: false,
    allCosplays: [],
    user: {},
    loading: true
  }

  componentDidMount() {
    firebase = new Firebase((error, user) => {
      if (error) {
        return alert(`Something went wrong D: ${error}`)
      }

      firebase.getCosplays(allCosplays => {
        this.setState({ allCosplays, user }, () => {
          this.setState({ loading: false })
        })
      })
      this.setState({ user });
    });
  }


  componentWillUnmount() {
    firebase.detach();
  }

  toggleAddCosplayModal() {
    this.setState({ addCosplayVisible: !this.state.addCosplayVisible })
  }

  renderCosplayList = (cosplayList) => {
    return <CosplayList cosplayList={cosplayList} updateCosplayDatabase={this.updateCosplayDatabase} />
  }

  addCosplayDatabase = cosplay => {
    firebase.addCosplayDatabase({
      cosplay: cosplay.cosplay,
      color: cosplay.color,
      series: cosplay.series,
      elements: [],
      image: cosplay.image,
      imageUri: cosplay.imageUri
    });
  }

  updateCosplayDatabase = cosplay => {
    firebase.updateCosplayDatabase(cosplay);
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }

    return (
      <View style={styles.container} >
        <Modal animationType="slide"
          visible={this.state.addCosplayVisible}
          onRequestClose={() => this.toggleAddCosplayModal()}>
          <CreateCosplayForm closeForm={() => this.toggleAddCosplayModal()} addCosplayDatabase={this.addCosplayDatabase} />
        </Modal>


        <View style={{ height: "90%", width: "90%", marginTop: 40, flex: 9 }}>
          <FlatList
            data={this.state.allCosplays}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) =>
              this.renderCosplayList(item)} />
        </View>

        <View style={{ flex: 1, marginTop: 20, paddingTop: 10, flexDirection: "row" }}>
          <TouchableOpacity style={{ flexDirection: "row" }} onPress={this.props.toggleCosplays}>
            <AntDesign name="back" size={24} color="grey" />
            <Text style={styles.button}> Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row", marginLeft: 40 }} onPress={() => this.toggleAddCosplayModal()}>
            <AntDesign name="plus" size={24} color="grey" />
            <Text style={[styles.button]}> Add Cosplay</Text>
          </TouchableOpacity>
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
  button: {
    color: "grey",
    fontSize: 20
  }
});