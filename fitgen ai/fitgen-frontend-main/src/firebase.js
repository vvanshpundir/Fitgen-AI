// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCKT9RQ95wNg-OuLB06h0Yr0dGEfSPpD4",
  authDomain: "botpress-integration-2c84f.firebaseapp.com",
  databaseURL: "https://botpress-integration-2c84f-default-rtdb.firebaseio.com",
  projectId: "botpress-integration-2c84f",
  storageBucket: "botpress-integration-2c84f.appspot.com",
  messagingSenderId: "441134939811",
  appId: "1:441134939811:web:448f5208fca0b07f7e8916",
  measurementId: "G-Y6JKLFJXPL",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

export { auth, googleProvider, appleProvider };
export default app;
