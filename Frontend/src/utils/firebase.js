// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDH0g-ZIL9cyBa0y02Q53hHMZOLiOU5xUY",
    authDomain: "designing-3806e.firebaseapp.com",
    projectId: "designing-3806e",
    storageBucket: "designing-3806e.firebasestorage.app",
    messagingSenderId: "99427297051",
    appId: "1:99427297051:web:5f68118722115fecba15be",
    measurementId: "G-BE1GW3G7T0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export { auth, provider }