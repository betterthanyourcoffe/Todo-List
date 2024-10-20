// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOUcsyfIlBDW4TMnz7ke8RJ-ZkjAmE6_s",
  authDomain: "todo-46310.firebaseapp.com",
  projectId: "todo-46310",
  storageBucket: "todo-46310.appspot.com",
  messagingSenderId: "298318073929",
  appId: "1:298318073929:web:fe5ff1b2d7efb522da2f98",
  measurementId: "G-ZJH09F4NCT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Firebase Authentication

// Export the initialized services
export { db, auth }; // Export both Firestore and Authentication instances
