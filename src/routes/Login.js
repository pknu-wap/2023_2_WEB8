import React, { useState } from "react";
import {
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../firebase";
import LogoutBtn from "../components/logoutBtn";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email);

        //로그인 후 지속성 부여
        setPersistence(auth, browserSessionPersistence)
          .then(() => {
            console.log("로그인 상태 지속성 설정 성공");
            // 여기에 필요한 다른 초기화 로직을 추가할 수 있습니다.
          })
          .catch((error) => {
            console.error("로그인 상태 지속성 설정 실패:", error);
          });

        navigate(`${process.env.PUBLIC_URL}/main`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <div className="login-container" onSubmit={handleLogin}>
      <form>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
      <LogoutBtn />
    </div>
  );
};

export default RegistrationForm;
