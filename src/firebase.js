import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// ✅ ADD THESE
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIdMThxyb9OCsLHg2d5Qt2UAZsYvkQ72U",
  authDomain: "pourkay-1e4e9.firebaseapp.com",
  projectId: "pourkay-1e4e9",
  storageBucket: "pourkay-1e4e9.firebasestorage.app",
  messagingSenderId: "730159910838",
  appId: "1:730159910838:web:b7970c6fd719520bb0bb17",
  measurementId: "G-1Y152GQCY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ THIS WAS MISSING
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// optional helper
export const signInWithGoogle = () => signInWithPopup(auth, provider);