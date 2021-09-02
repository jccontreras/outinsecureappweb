import firebase from "firebase/compat";

// Import needed firebase modules
import "firebase/auth";
import "firebase/firestore"
import "firebase/app"

// Firebase app config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDdAb23VFC5aTgyg4WrcC7oBEToCew_eN8",
    authDomain: "outinaw-8f3ae.firebaseapp.com",
    databaseURL: "https://outinaw-8f3ae-default-rtdb.firebaseio.com",
    projectId: "outinaw-8f3ae",
    storageBucket: "outinaw-8f3ae.appspot.com",
    messagingSenderId: "30339129687",
    appId: "1:30339129687:web:34a322e0c6ee14beef5e12",
    measurementId: "G-SBDTZ9NDFM"
};

// Init our firebase app
firebase.initializeApp(firebaseConfig);