import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKlVXCtn_0esYkS85In6xKl__ue3x4GUk",
  authDomain: "ecommerce--firebase.firebaseapp.com",
  projectId: "ecommerce--firebase",
  storageBucket: "ecommerce--firebase.appspot.com",
  messagingSenderId: "607725117364",
  appId: "1:607725117364:web:75d3239534669c223adce1",
  measurementId: "G-QMLKZYWFVF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
