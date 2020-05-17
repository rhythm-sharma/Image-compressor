import "firebase/storage";
import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDjtgRNcPbmvcf5tvFd3OFj1wTPpiYlV0",
  authDomain: "fir-storage-8efd8.firebaseapp.com",
  databaseURL: "https://fir-storage-8efd8.firebaseio.com",
  projectId: "fir-storage-8efd8",
  storageBucket: "fir-storage-8efd8.appspot.com",
  messagingSenderId: "331136859746",
  appId: "1:331136859746:web:67c5cc5a6e2bfacc439b3b",
  measurementId: "G-H0F2658QSL"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const storage = firebase.storage();

export { firebase, storage as default };