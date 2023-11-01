import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyBV2hmKCeUcSy64N2tmY7A1zbuKvHiLGMo",
//   authDomain: "web8-984aa.firebaseapp.com",
//   projectId: "web8-984aa",
//   storageBucket: "web8-984aa.appspot.com",
//   messagingSenderId: "342957194597",
//   appId: "1:342957194597:web:62c4ff72889a02b3f6758c",
//   measurementId: "G-FY9RT6G2BK",
// };

// const app = initializeApp(firebaseConfig, "skinfor");
// const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
