import { useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const LabelBtn = (props) => {
  //false부분을 현재 사용자가 즐찾했는지에 따라
  //2. 데이터 필드를 통해 마이페이지 연결
  const { productName, userId, productId } = props;
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = async () => {
    console.log("userId", userId);
    try {
      //User Data Field Update
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

        //Product Data Field Update
        const productRef = doc(db, "Products", productId);
        const productDoc = await getDoc(productRef);

        if (productDoc.exists()) {
          const productFavorites = productDoc.data().favorites || [];

          if (!isFavorited) {
            productFavorites.push(userId);
          } else {
            const index = productFavorites.indexOf(userId);
            if (index > -1) {
              productFavorites.splice(index, 1);
            }
          }

          await updateDoc(productRef, { favorites: productFavorites });
        }
        //setState가 맨 마지막에 실행되도록
        setIsFavorited(!isFavorited);
      }
    } catch (error) {
      console.error("Error in LabelBtn: ", error);
    }
  };
  return (
    <div>
      <button className="label-btn" onClick={handleFavorite}>
        {isFavorited ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  );
};
export default LabelBtn;
