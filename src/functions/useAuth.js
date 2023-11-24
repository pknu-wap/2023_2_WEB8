//현재 로그인 중인 사용자의 데이터를 받아오는 함수

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("useEffect 내부, user 값:", user);
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        console.log("사용자가 로그인했씁니다.", authUser.email);

        try {
          // Firestore에서 특정 사용자의 데이터를 가져오기
          const userRef = doc(db, "Users", authUser.uid);
          const snapshot = await getDoc(userRef);

          if (snapshot.exists()) {
            const userData = snapshot.data();
            setUser((prevUser) => ({
              ...prevUser,
              uid: userData.uid,
              userName: userData.userName,
              skinType: userData.skinType,
            }));
          } else {
            console.log("해당 사용자의 데이터가 존재하지 않습니다.");
          }
        } catch (error) {
          console.error("사용자 데이터를 불러오는 중 에러 발생:", error);
        }
      } else {
        setUser(null);
        console.log("사용자가 로그아웃했습니다.");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("user 상태가 변경되었습니다.", user);
  }, [user]);

  return user;
};

export default useAuth;
