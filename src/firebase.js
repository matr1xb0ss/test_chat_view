import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBHDwRUR0NPqRfXN70lmx6T0rGhoRfvUVs",
  authDomain: "simple-user-flight-test-1.firebaseapp.com",
  databaseURL: "https://simple-user-flight-test-1.firebaseio.com",
  projectId: "simple-user-flight-test-1",
  storageBucket: "simple-user-flight-test-1.appspot.com",
  messagingSenderId: "227644889656",
  appId: "1:227644889656:web:0836fcaad04ee19ad264cd",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
export const firestore = firebase.firestore();