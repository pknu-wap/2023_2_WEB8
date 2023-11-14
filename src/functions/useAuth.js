import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        console.log("사용자가 로그인했씁니다.", authUser.email);
      } else {
        setUser(null);
        console.log("사용자가 로그아웃했씁니다.");
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export default useAuth;
