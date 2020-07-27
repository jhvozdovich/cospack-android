import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import palette from '../palette';
import CosplayList from "./cosplays/CosplayList";
import CreateCosplayForm from "./cosplays/CreateCosplayForm";
import Firebase from "../Firebase";

import { Platform, InteractionManager } from 'react-native';

export default class App extends React.Component {
  state = {
    addCosplayVisible: false,
    cosplayLists: [],
    user: {},
    loading: true
  }

  componentDidMount() {
    firebase = new Firebase((error, user) => {
      if (error) {
        return alert(`Something went wrong D: ${error}`)
      }

      firebase.getCosplays(cosplayLists => {
        this.setState({ cosplayLists, user }, () => {
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
    return <CosplayList cosplayList={cosplayList} updateCosplayList={this.updateCosplayList} />
  }

  addCosplayList = cosplay => {
    firebase.addCosplayList({
      cosplay: cosplay.cosplay,
      color: cosplay.color,
      series: cosplay.series,
      elements: []
    });
  }

  updateCosplayList = cosplay => {
    firebase.updateCosplayList(cosplay);
  }

  render() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size="large" color={palette.green2} />
        </View>
      )
    }

    return (
      <View style={styles.container} >
        <Modal animationType="slide"
          visible={this.state.addCosplayVisible}
          onRequestClose={() => this.toggleAddCosplayModal()}>
          <CreateCosplayForm closeForm={() => this.toggleAddCosplayModal()} addCosplayList={this.addCosplayList} />
        </Modal>
        <View>
          <Text>User: {this.state.user.uid}</Text>
        </View>
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
            keyExtractor={item => item.id.toString()}
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



// FOR ANDROID ISSUES WITH EXPO
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = '_lt_' + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };

  global.clearTimeout = id => {
    if (typeof id === 'string' && id.startsWith('_lt_')) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}