import { auth, db } from "./firebase/init.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useState } from "react";
import Nav from "./components/Nav";
import Inputs from "./components/Inputs";
import Logged from "./components/Logged";
import { async } from "@firebase/util";
import _ from "underscore";

function App() {
  const [user, setUser] = useState({});
  const [logged, setLogged] = useState(false);

  onAuthStateChanged(auth, (user) => {
    setTimeout(() => {
      if (user) {
        setUser(user);
        setLogged(true);
      } else {
        setUser({});
        setLogged(false);
      }
    }, 10);
  });

  async function updatePost() {
    const hardcodedId = "EnYUwsmaetoi0AEfjSpz";
    const postRef = doc(db, "posts", hardcodedId);
    const post = await getPostById(hardcodedId);
    console.log(post);
    const newPost = {
      ...post,
      title: "Land 6000k Job",
    };
    updateDoc(postRef, newPost);
  }

  function deletePost() {
    const hardcodedId = "EnYUwsmaetoi0AEfjSpz";
    const postRef = doc(db, "posts", hardcodedId);
    deleteDoc(postRef);
  }

  function createPost() {
    const post = {
      title: "Finish Firebase",
      description: "I could never snitch",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    console.log(posts);
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  }

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
          alert("Failed! Wrong password[!");  
        }
      });                                  
  }

  function logoutUser() {
    signOut(auth);
    setLogged(false);
    setUser({});
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );

    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map((doc) => doc.data()));
  }

  return (
    <div className="App">
      <Nav user={user} />
      {logged ? (
        <Logged logoutUser={logoutUser} />
      ) : (
        <Inputs auth={auth} registerUser={registerUser} loginUser={loginUser} />
      )}

      <div className="container--full">
        <button className="btn hover" onClick={createPost}>
          Make Post
        </button>
        <button className="btn hover" onClick={getAllPosts}>
          Get All Posts
        </button>
        <button className="btn hover" onClick={getPostById}>
          Get Post by ID
        </button>
        <button className="btn hover" onClick={getPostByUid}>
          Get Post by UID
        </button>
        <button className="btn hover" onClick={updatePost}>
          Update Post
        </button>
        <button className="btn hover" onClick={deletePost}>
          Delete Post
        </button>
      </div>
    </div>
  );
}

export default App;
