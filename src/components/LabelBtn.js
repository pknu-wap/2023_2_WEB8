import { useState } from "react";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  query,
  collection,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const LabelBtn = ({ userId, productName }) => {
  //false부분을 현재 사용자가 즐찾했는지에 따라
  //2. 데이터 필드를 통해 마이페이지 연결
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = async () => {
    try {
      const userRef = doc(db, "Users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userFavorites = userDoc.data().favorites || [];

        if (!isFavorited) {
          userFavorites.push(productName);
        } else {
          const index = userFavorites.indexOf(productName);
          if (index > -1) {
            userFavorites.splice(index, 1);
          }
        }

        await updateDoc(userRef, { favorites: userFavorites });
        //setState가 맨 마지막에 실행되도록
        setIsFavorited(!isFavorited);
      }
    } catch (error) {
      console.error("Error in LabelBtn: ", error);
    }
  };
  return (
    <div>
      <button onClick={handleFavorite}>
        {isFavorited ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  );
};
export default LabelBtn;
