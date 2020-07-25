import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default CosplayList = ({ cosplayList }) => {
  // const percentComplete = cosplayList.toDos.filter(todo => todo.completed).length / (cosplayList.toDos.length)
  return (
    <View style={[styles.container, { backgroundColor: cosplayList.color }]}>
      <Text style={styles.cosplays}>{cosplayList.cosplay}</Text>
      <View>
        <View>
          <Text>Percent Complete: 27%</Text>
        </View>
      </View>
    </View>
  )
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