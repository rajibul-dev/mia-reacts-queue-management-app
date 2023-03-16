// Import the functions you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// if .env version
// const firebaseConfig = {
//   apiKey: process.env.QUEUE_APP_FIREBASE_API_KEY,
//   authDomain: process.env.QUEUE_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.QUEUE_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.QUEUE_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.QUEUE_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.QUEUE_APP_FIREBASE_APP_ID,
//   measurementId: process.env.QUEUE_APP_FIREBASE_MEASUREMENT_ID,
// };

// Config object
const firebaseConfig = {
  apiKey: "AIzaSyDOcZ1JsmydWg-GsDxCId69RAb0Bw2lKbg",
  authDomain: "web-apps-for-mia.firebaseapp.com",
  projectId: "web-apps-for-mia",
  storageBucket: "web-apps-for-mia.appspot.com",
  messagingSenderId: "690201586785",
  appId: "1:690201586785:web:ab7cdde43b7a8b95260e20",
  measurementId: "G-18BT77B0M9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }