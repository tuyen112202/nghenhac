// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "zing-mp3-auth.firebaseapp.com",
  projectId: "zing-mp3-auth",
  storageBucket: "zing-mp3-auth.appspot.com",
  messagingSenderId: "476712996525",
  appId: "1:476712996525:web:be81bfc71a753049b8c024"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);
export const usersRef = collection(database, 'users');