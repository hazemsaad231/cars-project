import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_mfSo-X5AucjU6LMw5OIlpCsbCZglYTw",
  authDomain: "cars-a98ed.firebaseapp.com",
  projectId: "cars-a98ed",
  storageBucket: "cars-a98ed.firebasestorage.app",
  messagingSenderId: "353676937071",
  appId: "1:353676937071:web:d47532dbd18bb1ff68ca9a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
