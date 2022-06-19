// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAosCSRPDcOajqtykUUvDfoiCrCqYceiwo",
  authDomain: "meal-in-time-97a65.firebaseapp.com",
  databaseURL: "https://meal-in-time-97a65-default-rtdb.firebaseio.com",
  projectId: "meal-in-time-97a65",
  storageBucket: "meal-in-time-97a65.appspot.com",
  messagingSenderId: "190288928389",
  appId: "1:190288928389:web:200de8a3285da4b5a6d3ec",
  measurementId: "G-VE9ZGDLCB8"
}

// Initialize Firebase
export const firebaseapp = initializeApp(firebaseConfig)