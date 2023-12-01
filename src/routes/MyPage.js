import List from "../components/List";
import Favorites from "../components/Favorites";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../functions/useAuth";
import Navbars2 from "../components/Navbars2";
import "../css/MyPage.css";
import { useNavigate } from "react-router-dom";
import "../css/Favorites.css";

function MyPage() {
  const [navButton, setNavButton] = useState(0);
  const currentUser = useAuth();
  const navigate = useNavigate();

  if (currentUser == null) {
    return <div>Loading...</div>;
  }

  const handleEdit = () => {
    navigate(`/mypage/editInfo`);
  };

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
              즐겨찾는 제품
            </li>
            <li onClick={handleEdit}>회원 정보 수정</li>
          </ul>
        </div>
        <div className="dashboard-content">
          {navButton === 0 && (
            <div>
              <List title="Posts" userInfo={currentUser} />
              <List title="Comments" userInfo={currentUser} />
            </div>
          )}
          {navButton === 1 && (
            <div>
              <Favorites userInfo={currentUser} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default MyPage;
