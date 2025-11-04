// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcV2EDvjEQY5fslXOx_Lh2Gmx31b2rerA",
  authDomain: "maikedah-9460f.firebaseapp.com",
  projectId: "maikedah-9460f",
  storageBucket: "maikedah-9460f.firebasestorage.app",
  messagingSenderId: "812682435075",
  appId: "1:812682435075:web:66349a79a36eb6c3ed4c36"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);