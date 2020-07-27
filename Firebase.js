import * as firebase from "firebase";
import "@firebase/firestore";
import CosplayList from "./components/CosplayList";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

class Firebase {
  constructor(callback) {
    this.init(callback)
  }
  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback(null, user)
      } else {
        firebase.auth().signInAnonymously().catch(error => {
          callback(error)
        })
      }
    })
  }

  getCosplays(callback) {
    let db = firebase.firestore()
      .collection("users")
      .doc(this.userId)
      .collection("cosplays")

    this.unsubscribe = db.onSnapshot(snapshot => {
      cosplayLists = []
      snapshot.forEach(doc => {
        cosplayLists.push({ id: doc.id, ...doc.data() })
      })

      callback(cosplayLists)
    })
  }

  get userId() {
    return firebase.auth().currentUser.uid
  }

  detach() {
    this.unsubscribe();
  }
}

export default Firebase;