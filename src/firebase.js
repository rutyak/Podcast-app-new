// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANH-CJFXk6uob0lVE1V9LujLJfkM2BrcM",
  authDomain: "podcast-app-react-c2460.firebaseapp.com",
  projectId: "podcast-app-react-c2460",
  storageBucket: "podcast-app-react-c2460.appspot.com",
  messagingSenderId: "863641894768",
  appId: "1:863641894768:web:01f5e3c23a892865ddd9b5",
  measurementId: "G-TFB6BYE2PF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };