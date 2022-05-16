import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

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
export const firestore = getFirestore(app);
export const wordsRef = collection(firestore, "Brand");
export const usersRef = collection(firestore, "Users");
export const mindMapRef = collection(firestore, "MindMap");
export const finishedMapRef = collection(firestore, "FinishedMaps");
export const provider = new GoogleAuthProvider();
