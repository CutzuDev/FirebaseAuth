// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDb3yypRitzeT7zjJVwCARXXi78cySB1OM",
  authDomain: "fir-practice-c5fdc.firebaseapp.com",
  projectId: "fir-practice-c5fdc",
  storageBucket: "fir-practice-c5fdc.appspot.com",
  messagingSenderId: "1012184687672",
  appId: "1:1012184687672:web:5428d113a10c8af0ed32cd",
  measurementId: "G-RWMZHT8TW3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
