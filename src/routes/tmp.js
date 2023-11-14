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
    apiKey: "AIzaSyBV2hmKCeUcSy64N2tmY7A1zbuKvHiLGMo",
    authDomain: "web8-984aa.firebaseapp.com",
    projectId: "web8-984aa",
    storageBucket: "web8-984aa.appspot.com",
    messagingSenderId: "342957194597",
    appId: "1:342957194597:web:62c4ff72889a02b3f6758c"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);