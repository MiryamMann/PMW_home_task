import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUxmipU36WL9giUnpZ0BYMSn9K2VITeFw",
  authDomain: "home-task-27018.firebaseapp.com",
  projectId: "home-task-27018",
  storageBucket: "home-task-27018.firebasestorage.app",
  messagingSenderId: "432728427028",
  appId: "1:432728427028:web:00d3c1c385d9eccc00b501",
  measurementId: "G-MH6TW8QV4E"
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
