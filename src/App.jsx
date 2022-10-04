import logo from "./logo.svg";
import "./App.css";
import { auth } from "./firebase/init.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Inputs from "./components/Inputs";

function registerUser(auth, email, password) {
  createUserWithEmailAndPassword(auth, email, password).catch((e) => {
    const errorCode = e.code;
    if (errorCode === "auth/email-already-in-use") {
      alert("Failed! Email already in use!");
    }
  });

  // setTimeout(() => {
  //   alert("Succesfully registered!");
  // }, 1000);
}

function App() {
  return (
    <div className="App">
      <Nav />
      <Inputs auth={auth} registerUser={registerUser} />
    </div>
  );
}

export default App;
