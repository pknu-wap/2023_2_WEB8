import React, { useState } from "react";
import {
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../firebase";
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

        navigate(-1);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.name === "email") {
        // 엔터 키를 누른 입력 필드가 이메일 필드인 경우
        document.getElementById("passwordInput").focus();
      } else if (e.target.name === "password") {
        // 엔터 키를 누른 입력 필드가 비밀번호 필드인 경우
        handleLogin();
      } else if (e.target.name === "loginButton") {
        // 엔터 키를 누른 요소가 로그인 버튼인 경우
        handleLogin();
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        id="emailInput"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input
        type="password"
        id="passwordInput"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button id="loginButton" onClick={handleLogin} onKeyDown={handleKeyDown}>
        Login
      </button>
    </div>
  );
};
export default RegistrationForm;
