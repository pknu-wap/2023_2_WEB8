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
  const [error, setError] = useState(""); // 오류 메시지를 표시할 상태 변수
  const [showError, setShowError] = useState(false); // 메시지를 표시할지 여부를 제어하는 상태 변수
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

        //로그인 성공 시, 무조건 main 화면으로 감.
        navigate(`${process.env.PUBLIC_URL}/main`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

        // 오류 메시지를 표시할 상태 변수를 업데이트
        setError("아이디나 비밀번호가 틀렸습니다. 다시 확인해주세요.");
        setShowError(true); // 메시지를 표시하도록 설정
        alert("로그인 정보가 일치하지 않습니다.");

        // 로그인 실패 시에 비밀번호 초기화
        setPassword("");
      });
  };

  return (
    <div className="login-container">
      <form>
        <h2>Login</h2>
        <input
          type="email"
          id="emailInput"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="passwordInput"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id="loginButton" onClick={handleLogin}>
          Login
        </button>
        <div className="sign_div">
          <button
            className="sign_button"
            onClick={() => navigate(`${process.env.PUBLIC_URL}/signup`)}
          >
            Sign up
          </button>
        </div>

        {/* showError가 true이면 페이드인 애니메이션 효과를 주어 메시지를 표시 */}
        {showError && (
          <div
            className="error-message"
            style={{
              color: "red",
              animation: "fadeIn 0.5s ease",
            }}
          >
            {error}
          </div>
        )}
      </form>
    </div>
  );
};
export default RegistrationForm;
