import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

const firebaseConfig = {
  apiKey: "AIzaSyBeMh1LhwlWgraosAWS41kFhSre19VczfI",
  authDomain: "login-5fcfb.firebaseapp.com",
  projectId: "login-5fcfb",
  storageBucket: "login-5fcfb.appspot.com",
  messagingSenderId: "599211704050",
  appId: "1:599211704050:web:5384548870be406d0a1a6b",
  measurementId: "G-K7DKT9GPKQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);