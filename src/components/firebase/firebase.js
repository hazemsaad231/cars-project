
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc,getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyD_mfSo-X5AucjU6LMw5OIlpCsbCZglYTw",
  authDomain: "cars-a98ed.firebaseapp.com",
  projectId: "cars-a98ed",
  storageBucket: "cars-a98ed.firebasestorage.app",
  messagingSenderId: "353676937071",
  appId: "1:353676937071:web:d47532dbd18bb1ff68ca9a",
  measurementId: "G-6NM36Y7RXC"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app,auth, analytics, db, collection, addDoc, getDocs };