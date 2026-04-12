import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDudyaiaMu6ts-vGd0n3pigmh7eIO1U1kc",
  authDomain: "debugg-app.firebaseapp.com",
  projectId: "debugg-app",
  storageBucket: "debugg-app.firebasestorage.app",
  messagingSenderId: "118584632905",
  appId: "1:118584632905:web:d5989a0d6184b19f5c4198"
};

export const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);