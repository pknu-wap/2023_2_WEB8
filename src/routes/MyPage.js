import List from "../components/List";
import Favorites from "../components/Favorites";
import ShowProducts from "../components/ShowProducts";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../functions/useAuth";
import Navbars from "../components/Navbars";
import Navbars2 from "../components/Navbars2";
import "../css/MyPage.css";

function MyPage() {
  const [navButton, setNavButton] = useState(0);

  const currentUser = useAuth();

  console.log(currentUser);
  if (currentUser == null) {
    return <div>Please log in.</div>;
  }

  return (
    <div>
      <Navbars2 />
      <div className="user-info">
        <div>
          <h2>안녕하세요. {currentUser.userName}님!</h2>
        </div>
        <div>
          <h2>피부타입 : {currentUser.skinType}</h2>
        </div>
      </div>
      <div className="dashboard-container">
        <div className="dashboard-nav">
          <ul>
            <li
              className={navButton === 0 ? "active" : ""}
              onClick={() => {
                setNavButton(0);
              }}
            >
              내가 작성한 글
            </li>
            <li
              className={navButton === 1 ? "active" : ""}
              onClick={() => {
                setNavButton(1);
              }}
            >
              즐겨찾기
            </li>
            <li
              className={navButton === 2 ? "active" : ""}
              onClick={() => {
                setNavButton(2);
              }}
            >
              사용 제품 기록
            </li>
          </ul>
        </div>
        <div className="dashboard-content">
          {navButton === 0 && (
            <div>
              <List title="Posts" />
              <List title="Comments" />
            </div>
          )}
          {navButton === 1 && (
            <div>
              <Favorites userInfo={currentUser} />
            </div>
          )}
          {navButton === 2 && (
            <div>
              <ShowProducts skinType={currentUser.skinType} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default MyPage;
