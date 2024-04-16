import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "airy-help.firebaseapp.com",
  projectId: "airy-help",
  storageBucket: "airy-help.appspot.com",
  messagingSenderId: "808664156933",
  appId: "1:808664156933:web:20c9b4d7c5343d23a6056c",
  measurementId: "G-TK56VQX80N",
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };
