// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEtVSlgqO7oojPAjDKdem7uRn-fq0sbUE",
  authDomain: "converxa-chat.firebaseapp.com",
  projectId: "converxa-chat",
  storageBucket: "converxa-chat.firebasestorage.app",
  messagingSenderId: "1019884171262",
  appId: "1:1019884171262:web:3017e9d4fd96fa3dfcdaaf",
  measurementId: "G-6ENDRX089P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();