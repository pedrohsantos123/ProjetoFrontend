import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAXr6LoJGBGbVv3VPcwbo6xYUeuyV7P2hA",
    authDomain: "projeto-final-faculdade-f068d.firebaseapp.com",
    projectId: "projeto-final-faculdade-f068d",
    storageBucket: "projeto-final-faculdade-f068d.firebasestorage.app",
    messagingSenderId: "639248605449",
    appId: "1:639248605449:web:072cf8d5859f7370f233d8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
