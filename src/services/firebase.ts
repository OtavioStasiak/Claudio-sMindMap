import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBH78uF422KF4rzZICTzoapbY1dzT1_h4k",
  authDomain: "claudio-mindmap.firebaseapp.com",
  projectId: "claudio-mindmap",
  storageBucket: "claudio-mindmap.appspot.com",
  messagingSenderId: "922491651051",
  appId: "1:922491651051:web:5e9730041d7d0d93e68fae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
