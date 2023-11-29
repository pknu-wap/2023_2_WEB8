import { useEffect, useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../functions/useAuth";
import { useNavigate } from "react-router-dom";

const LabelBtn = (props) => {
  //false부분을 현재 사용자가 즐찾했는지에 따라
  //2. 데이터 필드를 통해 마이페이지 연결
  const { productName, userId, productId } = props;
  const [isFavorited, setIsFavorited] = useState(false);
  const currentUser = useAuth(); // Firebase auth context에서 현재 사용자 정보 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    fetchIsFavorite();
  }, []);

  const fetchIsFavorite = async () => {
    if (userId) {
      const userRef = doc(db, "Users", userId);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userFavoriteProducts = userSnapshot.data().favorites || [];
        setIsFavorited(userFavoriteProducts.includes(productName));
      }
    }
  };

  const handleFavorite = async () => {
    try {
      if (!currentUser) {
        // 비로그인 상태에서는 로그인이 필요하다는 메시지를 띄우고 로그인 화면으로 이동
        alert("로그인이 필요한 서비스입니다.");
        // 로그인 화면으로 이동하는 코드
        navigate(`${process.env.PUBLIC_URL}/login`);
        return;
      }
      //User Data Field Update
      const userRef = doc(db, "Users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userFavorites = userDoc.data().favorites || [];

        if (!isFavorited && !userFavorites.includes(productName)) {
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
