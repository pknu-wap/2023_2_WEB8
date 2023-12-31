//현재 로그인 중인 사용자의 데이터를 받아오는 함수

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          // Firestore에서 특정 사용자의 데이터를 가져오기
          const userRef = doc(db, "Users", authUser.uid);
          const snapshot = await getDoc(userRef);

          if (snapshot.exists()) {
            const userData = snapshot.data();
            const { uid, userName, skinType } = userData;

            if (userName && skinType) {
              console.log("사용자가 로그인했씁니다.", authUser.email);
              setUser(() => ({
                ...authUser,
                uid,
                userName,
                skinType,
              }));
            }
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

  return user;
};

export default useAuth;
