// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZQ6E7PJ20fw5sNhk3aM0noeJCbfKwfIs",
  authDomain: "react-socialmedia-104dc.firebaseapp.com",
  projectId: "react-socialmedia-104dc",
  storageBucket: "react-socialmedia-104dc.appspot.com",
  messagingSenderId: "974158434219",
  appId: "1:974158434219:web:31679ca34a2c624c3b8cee",
  measurementId: "G-R0RKWVKZRV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
