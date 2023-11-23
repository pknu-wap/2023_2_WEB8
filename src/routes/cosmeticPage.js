import { Link } from "react-router-dom";
import ShowProducts from "../components/ShowProducts";
import { useEffect, useId, useState } from "react";
import useAuth from "../functions/useAuth";
import Navbars from "../components/Navbars2";
import "../css/main.css";
import "../css/Product.css";

function CosmeticLanking() {
  const user = useAuth();
  const [userSkinType, setUserSkinType] = useState("");
  const [userId, setUserId] = useState("");
  const [order, setOrder] = useState("popular");
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
          <select value={order} onChange={handleSelectChange}>
            <option value="Rank">별점순</option>
            <option value="favorites">인기순</option>
            <option value="lowest-price">낮은 가격순</option>
            <option value="highest-price">높은 가격순</option>
          </select>
          <div className="search-area">
            <form>
              <input type="search" placeholder="검색"></input>
              <span>검색</span>
            </form>
          </div>
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

function mainRanking() {
  return (
    <div className="main_cosmetic">
      <ul className="type_nav">
        <li>
          <a href="#">지성</a>
        </li>
        <li>
          <a href="#">건성</a>
        </li>
        <li>
          <a href="#">중성</a>
        </li>
      </ul>

      <ul className="amount">
        <li>
          <div>1위</div>
        </li>

        <li>
          <div>2위</div>
        </li>

        <li>
          <div>3위</div>
        </li>
      </ul>

      <ul className="amount">
        <li>
          <div>4위</div>
        </li>

        <li>
          <div>5위</div>
        </li>

        <li>
          <div>6위</div>
        </li>
      </ul>

      <ul className="amount">
        <li>
          <div>7위</div>
        </li>

        <li>
          <div>8위</div>
        </li>

        <li>
          <div>9위</div>
        </li>
      </ul>

      <ul>
        <li>
          <a href="#">1</a>
        </li>
        <li>|</li>
        <li>
          <a href="#">2</a>
        </li>
        <li>|</li>
        <li>
          <a href="#">3</a>
        </li>
      </ul>
    </div>
  );
}

export default CosmeticLanking;
