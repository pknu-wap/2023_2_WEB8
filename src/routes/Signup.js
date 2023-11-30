// src/routes/Signup.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import createUserInFirestore from "../functions/createUserInFiresotre";
import "../css/Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userSkinType, setUserSkinType] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const createdUser = userCredential.user;

      await createUserInFirestore({
        uid: createdUser.uid,
        email: createdUser.email,
        userName: userName,
        skinType: userSkinType,
      });
      console.log("회원가입 성공:", createdUser);

      navigate(`${process.env.PUBLIC_URL}/Login`);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("회원가입 실패:", errorCode, errorMessage);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSignup}>
      <h1>SKINFOR</h1>
      <h3>회원가입</h3>
      <label htmlFor="email">이메일:</label>
      <input
        className="signup-input"
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password">비밀번호:</label>
      <input
        className="signup-input"
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label htmlFor="username">사용자명:</label>
      <input
        className="signup-input"
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <label htmlFor="skin-type">피부타입</label>
      <select
        className="signup-select"
        name="skin-type"
        id="skin-type"
        onChange={(e) => setUserSkinType(e.target.value)}
      >
        <option value="" disabled={userSkinType !== ""}>
          {userSkinType
            ? `선택한 피부 타입: ${userSkinType}`
            : "피부 타입을 선택하세요"}
        </option>
        <option value="Dry">건성</option>
        <option value="Oily">지성</option>
        <option value="Sensitive">민감성</option>
        <option value="Unset">모름</option>
      </select>
      <button className="signup-button">회원가입</button>
    </form>
  );
};

export default Signup;
