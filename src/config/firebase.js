// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCR3WInW3MAodyHWO8RIPSJ793xDcLdCYU",
  authDomain: "hassan-7f6a0.firebaseapp.com",
  projectId: "hassan-7f6a0",
  storageBucket: "hassan-7f6a0.firebasestorage.app",
  messagingSenderId: "479076191214",
  appId: "1:479076191214:web:ded6a65f6e09d98cf05cff",
  measurementId: "G-ZDMHK8LD6Q",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
