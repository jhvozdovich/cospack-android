import * as firebase from "firebase";
import "@firebase/firestore";
import config from "../config.js"

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
    let dbCosplay = this.dbCosplay.orderBy("cosplay");

    this.unsubscribe = dbCosplay.onSnapshot(snapshot => {
      cosplayLists = []
      snapshot.forEach(doc => {
        cosplayLists.push({ id: doc.id, ...doc.data() })
      })

      callback(cosplayLists)
    })
  }

  addCosplayToDatabase(cosplayList) {
    let dbCosplay = this.dbCosplay;
    dbCosplay.add(cosplayList);
  }

  updateCosplayInDatabase(cosplayList) {
    let dbCosplay = this.dbCosplay.doc(cosplayList.id).update(cosplayList);
  }

  getElements(callback) {
    let dbElement = this.dbElements.orderBy("elementName");

    this.unsubscribe = dbElement.onSnapshot(snapshot => {
      elementLists = []
      snapshot.forEach(doc => {
        elementLists.push({ id: doc.id, ...doc.data() })
      })

      callback(elementLists)
    })
  }

  addElementToDatabase(elementList) {
    let dbElement = this.dbElement;
    dbElement.add(elementList);
  }

  updateElementInDatabase(elementList) {
    let dbElement = this.dbElement.doc(elementList.id).update(elementList);
  }

  get userId() {
    return firebase.auth().currentUser.uid
  }

  get dbCosplay() {
    return firebase.firestore()
      .collection("users")
      .doc(this.userId)
      .collection("cosplays");
  }

  get dbElements() {
    return firebase.firestore()
      .collection("users")
      .doc(this.userId)
      .collection("cosplays")
      .doc(this.dbCosplay).forEach(doc => {
        doc.collection("elements")
      })
  }

  detach() {
    this.unsubscribe();
  }
}

export default Firebase;