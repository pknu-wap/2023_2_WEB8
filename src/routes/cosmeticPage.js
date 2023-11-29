import ShowProducts from "../components/ShowProducts";
import { useEffect, useState } from "react";
import useAuth from "../functions/useAuth";
import Navbars from "../components/Navbars2";
import "../css/main.css";
import "../css/Product.css";

function CosmeticLanking() {
  const user = useAuth();
  const [userSkinType, setUserSkinType] = useState("");
  const [userId, setUserId] = useState("");
  const [order, setOrder] = useState("Rank");

  const handleSelectChange = (event) => {
    setOrder(event.target.value);
  };

  useEffect(() => {
    if (user) {
      setUserSkinType(user.skinType);
      setUserId(user.uid);
    }
  }, [user]);

  const handleSort = (e) => {
    setUserSkinType(e.target.value);
  };

  return (
    <div>
      <Navbars />
      <div className="cosmetic-page">
        <div className="select-bar">
          <div className="ranking-text">
            <h1>랭킹</h1>
          </div>
          <div className="select-button">
            <button
              onClick={handleSort}
              value="Dry"
              disabled={"Dry" === userSkinType}
            >
              건성
            </button>
            <button
              onClick={handleSort}
              value="Oily"
              disabled={"Oily" === userSkinType}
            >
              지성
            </button>
            <button
              onClick={handleSort}
              value="Sensitive"
              disabled={"Sensitive" === userSkinType}
            >
              민감성
            </button>
          </div>
          <select
            value={order}
            onChange={handleSelectChange}
            className="select-dropdown"
          >
            <option value="Rank">별점순</option>
            <option value="favorites">인기순</option>
            <option value="lowest-price">낮은 가격순</option>
            <option value="highest-price">높은 가격순</option>
          </select>
        </div>
        <ShowProducts
          skinType={userSkinType}
          orderBy={order}
          userUid={userId}
        />
      </div>
    </div>
  );
}

export default CosmeticLanking;
