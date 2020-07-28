import React from "react";
import ReactDOM from "react-dom";
import CosplayControl from "./cosplays/CosplayControl";
import { createStore } from "redux";
// import "../index.css";
import rootReducer from "../reducers/index";
import { View } from "react-native";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import firebase from "../Firebase";
import "firebase/auth";

const store = createStore(rootReducer);

//react redux firebase props
// const rrfProps = {
//   firebase,
//   config: {
//     userProfile: "users",
//     useFirestoreForProfile: true,
//   },
//   dispatch: store.dispatch,
//   createFirestoreInstance
// }

store.subscribe(() =>
  console.log(store.getState())
);

// ReactDOM.render(
//   <Provider store={store}>
//     {/* <ReactReduxFirebaseProvider {...rrfProps}> */}
//     <CosplayControl />
//     {/* </ReactReduxFirebaseProvider> */}
//   </Provider>,
//   // document.getElementById("root")
// );

export default function App() {
  return (
    <View>
      <CosplayControl />
    </View>
  )
}