// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBUeF8SBzYXdiR_T9d7pR47Wjo4YPAeFs",
  authDomain: "opendataao.firebaseapp.com",
  projectId: "opendataao",
  storageBucket: "opendataao.firebasestorage.app",
  messagingSenderId: "733359662451",
  appId: "1:733359662451:web:b302a3df9904b9a6fc1106",
  measurementId: "G-GEYQ47EXF7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
