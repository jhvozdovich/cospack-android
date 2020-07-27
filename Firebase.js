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
    // change to order by completion/sort options?
    let db = this.db.orderBy("cosplay");

    this.unsubscribe = db.onSnapshot(snapshot => {
      cosplayLists = []
      snapshot.forEach(doc => {
        cosplayLists.push({ id: doc.id, ...doc.data() })
      })

      callback(cosplayLists)
    })
  }

  addCosplayList(cosplayList) {
    let db = this.db;
    db.add(cosplayList);
  }

  updateCosplayList(cosplayList) {
    let db = this.db.doc(cosplayList.id).update(cosplayList);
  }

  get userId() {
    return firebase.auth().currentUser.uid
  }

  get db() {
    return firebase.firestore()
      .collection("users")
      .doc(this.userId)
      .collection("cosplays");
  }

  detach() {
    this.unsubscribe();
  }
}

export default Firebase;