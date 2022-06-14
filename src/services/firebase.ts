import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCo7etbaAAtflplEy44fjr7I8Btu3Ksd3k",
  authDomain: "mindmap-521ee.firebaseapp.com",
  projectId: "mindmap-521ee",
  storageBucket: "mindmap-521ee.appspot.com",
  messagingSenderId: "263483944024",
  appId: "1:263483944024:web:ed714b900208956658ae2d"
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
