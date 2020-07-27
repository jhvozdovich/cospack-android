import * as firebase from "firebase";
import "@firebase/firestore";
import config from "./config.js"

const firebaseConfig = config;

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