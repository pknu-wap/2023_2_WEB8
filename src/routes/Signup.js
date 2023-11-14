// src/routes/Signup.js
import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // 여기서 getAuth 함수를 호출해야 합니다.
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('회원가입 성공:', user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('회원가입 실패:', errorCode, errorMessage);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h1>SKINFOR</h1>
      <h3>회원가입</h3>
      <label htmlFor="email">이메일:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password">비밀번호:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">회원가입</button>
    </form>
  );
};

export default Signup;