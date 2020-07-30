import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Image } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class CosplayDetails extends React.Component {
  colorOptions = ["#008085", "#89D5D8", "#6C56BB", "#BB56B6", "#F1B90A", "#DD3B29", "#8B9794", "#232625"]

  state = {
    newCosplay: this.props.cosplayList.cosplay,
    newSeries: this.props.cosplayList.series,
    newColor: this.props.cosplayList.color,
    newImage: this.props.cosplayList.image,
    newImagePrev: this.props.cosplayList.imagePrev,
    cosplayDetailsVisible: false,
  }

  deleteAlert = () => {
    Alert.alert('WARNING', `Are you sure you want to delete ${this.props.cosplayList.cosplay} from CosPack?`, [
      { text: "OK", onPress: () => this.deleteCosplayDatabase(this.props.cosplayList) },
      { text: "Cancel" }
    ],
      { cancelable: true });
  }

  deleteCosplayDatabase = cosplay => {
    this.props.toggleCosplayDetailsVisible();
    this.props.closeElementsModal();
    firebase.deleteCosplayFromDatabase(cosplay);
  }

  updateCosplay = () => {
    let cosplayList = this.props.cosplayList;
    cosplayList.cosplay = this.state.newCosplay;
    cosplayList.series = this.state.newSeries;
    cosplayList.color = this.state.newColor;
    cosplayList.image = this.state.newImage;
    cosplayList.imagePrev = this.state.newImagePrev;
    this.props.updateCosplayDatabase(cosplayList)
  }

  renderColors() {
    return this.colorOptions.map(color => (
      <TouchableOpacity key={color} style={[styles.colorSelect, { backgroundColor: color }]}
        onPress={() => this.setState({ newColor: color })} />
    ))
  }

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ newImage: result.uri });
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
        this.setState({ newImagePrev: result.uri });
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  renderImage = () => {
    if (this.state.newImage) {
      return (
        <View style={styles.image}>
          {this.state.newImage && <Image source={{ uri: this.state.newImage }} style={{
            width: 90, height: 160, borderWidth: 2,
            borderColor: "grey"
          }} />}
        </View>
      )
    } else {
      return (
        <View style={styles.image}>
          <Image source={require("./../../public/ImageBlank.jpg")} style={{
            width: 90, height: 160, borderWidth: 2,
            borderColor: "grey"
          }} />
        </View>
      )
    }
  }

  renderImagePreview = () => {
    if (this.state.newImagePrev) {
      return (
        <View style={styles.image}>
          {this.state.newImagePrev && <Image source={{ uri: this.state.newImagePrev }} style={{
            width: 160, height: 100, borderWidth: 2,
            borderColor: "grey"
          }} />}
        </View>
      )
    } else if (this.state.newImage) {
      return (
        <View style={styles.image}>
          {this.state.newImage && <Image source={{ uri: this.state.newImage }} style={{
            width: 160, height: 100, borderWidth: 2,
            borderColor: "grey"
          }} />}
        </View>
      )
    } else {
      return (
        <View style={styles.image}>
          <Image source={require("./../../public/ImageBlank.jpg")} style={{
            width: 160, height: 100, borderWidth: 2,
            borderColor: "grey"
          }} />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <TouchableOpacity style={{ postion: "absolute", padding: 10 }} onPress={this.props.toggleCosplayDetailsVisible}>
            <AntDesign name="back" size={32} color={this.props.cosplayList.color} />
          </TouchableOpacity>
          <TouchableOpacity style={{ postion: "absolute", left: 250, padding: 10 }} onPress={() => this.deleteAlert()}>
            <AntDesign name="delete" size={32} color={this.props.cosplayList.color} />
          </TouchableOpacity>
        </View>
        <View style={[{ marginTop: 10, marginHorizontal: 30, flex: 3 }]} >
          <View style={{ alignItems: "center", borderBottomWidth: 3, borderBottomColor: this.props.cosplayList.color }}>
            <Text style={[styles.title]}>{this.props.cosplayList.cosplay}</Text>
          </View>
        </View>
        <View style={{ flex: 16 }}>
          <View style={{ marginHorizontal: 20 }}>
            <View style={styles.inputBox}>
              <Text style={styles.font}>Name:</Text>
              <TextInput
                style={[styles.input, { borderColor: this.props.cosplayList.color }]}
                onChangeText={textCosplay => this.setState({ newCosplay: textCosplay })}
                value={(this.state.newCosplay)} placeholder={this.props.cosplayList.cosplay} placeholderTextColor="black" />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.font}>Series:</Text>
              <TextInput
                style={[styles.input, { borderColor: this.props.cosplayList.color }]}
                onChangeText={textSeries => this.setState({ newSeries: textSeries })}
                value={(this.state.newSeries)} placeholder={this.props.cosplayList.series} placeholderTextColor="black" />
            </View>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15, alignItems: "center" }}>
            {this.renderColors()}
          </View>

          <TouchableOpacity onPress={this._pickImage}>
            {this.renderImage()}
          </TouchableOpacity>


          <TouchableOpacity onPress={this._pickImagePrev}>
            {this.renderImagePreview()}
          </TouchableOpacity>


        </View >
        <View style={{ flex: 2 }} >
          <TouchableOpacity style={{ alignSelf: "center" }}
            onPress={() => this.updateCosplay()} >
            <Text style={[styles.button, styles.font, {
              backgroundColor: this.props.cosplayList.color,
              fontWeight: "bold", color: "white",
            }]}>
              Update
                  </Text>
          </TouchableOpacity>
        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  colorSelect: {
    width: 35,
    height: 35,
    marginTop: 20,
    marginHorizontal: 5,
    borderRadius: 6
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
    height: 40,
    width: 250,
    marginHorizontal: 10,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "rgba(255, 255, 255, 0.7)"
  },
  button: {
    fontWeight: "bold",
    color: "white",
    padding: 10,
    borderRadius: 6
  },
  font: {
    marginTop: 5,
    fontSize: 20
  },
  inputBox: {
    flexDirection: "row",
    marginTop: 15
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  }
});