// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWJoxamPUMGPsS_DWunU4k6d6cFR6WCAg",
  authDomain: "pourbykay-9d808.firebaseapp.com",
  projectId: "pourbykay-9d808",
  storageBucket: "pourbykay-9d808.firebasestorage.app",
  messagingSenderId: "660228024981",
  appId: "1:660228024981:web:1de55ba77bc6efe633099c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);