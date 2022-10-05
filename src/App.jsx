import { auth } from "./firebase/init.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useState } from "react";
import Nav from "./components/Nav";
import Inputs from "./components/Inputs";
import Logged from "./components/Logged";

function App() {
  const [user, setUser] = useState({});
  const [logged, setLogged] = useState(false);

  onAuthStateChanged(auth, (user, logged) => {
    if (user && logged) {
      setUser(user);
      setLogged(true);
    }
  });

  function registerUser(auth, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Succes! te pupa tata");
      })
      .catch((e) => {
        const errorCode = e.code;
        if (errorCode === "auth/email-already-in-use") {
          alert("Failed! Email already in use!");
        }
      });
  }

  function loginUser(auth, email, passowrd) {
    signInWithEmailAndPassword(auth, email, passowrd)
      .then(({ user }) => {
        setUser(user);
        setLogged(true);

        alert("Succes! te pupa tata");
      })
      .catch((e) => {
        const errorCode = e.code;
        if (errorCode === "auth/user-not-found") {
          alert("Failed! Account not found!");
        } else if (errorCode === "auth/wrong-password") {
          alert("Failed! Wrong password!");
        }
      });
  }

  function logoutUser() {
    setLogged(false);
    setUser({});
    signOut(auth);
  }

  return (
    <div className="App">
      <Nav user={user} />
      {logged ? (
        <Logged logoutUser={logoutUser} />
      ) : (
        <Inputs auth={auth} registerUser={registerUser} loginUser={loginUser} />
      )}
    </div>
  );
}

export default App;
