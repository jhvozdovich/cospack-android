import React from "react";
import { StyleSheet, Text, View, Button, Image, KeyboardAvoidingView, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import palette from "../palette";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class CreateCosplayForm extends React.Component {
  colorOptions = ["#008085", "#89D5D8", "#6C56BB", "#BB56B6", "#F1B90A", "#DD3B29", "#8B9794", "#232625"]
  state = {
    cosplay: "",
    series: "",
    image: null,
    imagePrev: null,
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
    const { cosplay, series, color, image, imagePrev, imageUri, imagePrevUri, testField } = this.state
    const cosplayList = { cosplay, series, color, image, imagePrev, imageUri, imagePrevUri, testField }
    this.props.addCosplayDatabase(cosplayList)
    this.setState({
      cosplay: "",
      series: "",
      color: this.colorOptions[0],
      image: null,
      imagePrev: null,
      imageUri: null,
      imagePrevUri: null
    })
    this.props.closeForm();
  }

  setCosplayImage = (image) => {
    this.setState({ imageUri: image.uri })
  }

  setCosplayImagePrev = (imagePrev) => {
    this.setState({ imagePrevUri: imagePrev.uri })
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
        aspect: [9, 16],
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

  _pickImagePrev = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ imagePrev: result.uri });
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
          <Text style={styles.title}>New Cosplay</Text>
          <TextInput style={styles.input} placeholder="Cosplay" onChangeText={text => this.setState({ cosplay: text })} />
          <TextInput style={styles.input} placeholder="Series" onChangeText={text => this.setState({ series: text })} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
          {this.renderColors()}
        </View>

        <TouchableOpacity onPress={this._pickImage}>
          <Text style={[styles.input, styles.button, { backgroundColor: this.state.color }]} >Select Reference Photo</Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 90, height: 160 }} />}
        </View>

        <TouchableOpacity onPress={this._pickImagePrev}>
          <Text style={[styles.input, styles.button, { backgroundColor: this.state.color }]} >Select Preview Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.createCosplay} >
          <Text style={[styles.input, styles.button, {
            backgroundColor: this.state.color, borderWidth: 3, borderColor: "grey"
          }]}>
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
    fontSize: 40,
    marginBottom: 10,
    fontWeight: "bold",
    paddingHorizontal: 5,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 6
  },
  input: {
    borderRadius: 6,
    height: 50,
    marginVertical: 5,
    marginHorizontal: 30,
    textAlign: "center",
    fontSize: 18,
    borderWidth: 3,
    borderColor: "grey"
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