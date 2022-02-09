import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC8IRt6Ft-FLdcO2xz03eDPUYmBlKjHQkc",
  authDomain: "student-sheets.firebaseapp.com",
  projectId: "student-sheets",
  storageBucket: "student-sheets.appspot.com",
  messagingSenderId: "16656804820",
  appId: "1:16656804820:web:050c9d1808ebda59a2c441"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);