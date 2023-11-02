<<<<<<< HEAD
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // 로그인 성공 시 처리
        console.log("HI");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // 로그인 실패 시 처리
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <div>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
=======
function RegistrationLogin() {
    return (
        <form>
            <h1>SKIN FOR</h1>
            <div>email : <input type="email"></input></div>
            <div>password : <input type="password"></input></div>
            <button type="submit">회원가입 하기</button>
            <button>로그인 하러 가기</button>
        
        </form>
       
      );
}

export default RegistrationLogin;




>>>>>>> 1
