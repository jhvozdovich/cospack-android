import React from "react";
import { StyleSheet, Text, View, Button, Image, KeyboardAvoidingView, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import palette from "../palette";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class CreateCosplayForm extends React.Component {
  colorOptions = ["#BBF1F1", "#89D5D2", "#35B5AC", "#008085", "#BBF1F7", "#89D5D8", "#35B5AA", "#008089"]
  state = {
    cosplay: "",
    series: "",
    image: null,
    imageUri: null,
    color: this.colorOptions[0],
    testField: ""
  }

  renderColors() {
    return this.colorOptions.map(color => (
      <TouchableOpacity key={color} style={[styles.colorSelect, { backgroundColor: color }]} onPress={() => this.setState({ color: color })} />
    ))
  }

  createCosplay = () => {
    const { cosplay, series, color, image, imageUri, testField } = this.state
    const cosplayList = { cosplay, series, color, image, imageUri, testField }
    this.props.addCosplayDatabase(cosplayList)
    this.setState({
      cosplay: "",
      series: "",
      color: this.colorOptions[0],
      image: null,
      imageUri: null
    })
    this.props.closeForm();
  }

  setCosplayImage = (image) => {
    this.setState({ imageUri: image.uri })
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry! We can't access images without your permission!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" >
        <TouchableOpacity style={{ postion: "absolute", padding: 10 }} onPress={this.props.closeForm}>
          <AntDesign name="close" size={24} color={palette.green4} />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>Add New Cosplay</Text>
          <TextInput style={styles.input} placeholder="Cosplay" onChangeText={text => this.setState({ cosplay: text })} />
          <TextInput style={styles.input} placeholder="Series" onChangeText={text => this.setState({ series: text })} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {this.renderColors()}
        </View>

        <TouchableOpacity onPress={this._pickImage}>
          <Text style={[styles.input, styles.button, { backgroundColor: this.state.color }]} >Select Reference Photo</Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
        </View>

        <TouchableOpacity onPress={this.createCosplay} >
          <Text style={[styles.input, styles.button, { backgroundColor: this.state.color }]}>
            Create
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView >
    )
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: "grey",
    fontSize: 20
  },
  input: {
    borderWidth: 1,
    borderColor: palette.green1,
    borderRadius: 6,
    height: 50,
    marginTop: 20,
    marginHorizontal: 30,
    textAlign: "center",
    fontSize: 18
  },
  colorSelect: {
    width: 35,
    height: 35,
    marginTop: 20,
    marginHorizontal: 5,
    borderRadius: 6
  },
  button: {
    fontWeight: "bold",
    color: "white",
    paddingTop: 10
  }
})