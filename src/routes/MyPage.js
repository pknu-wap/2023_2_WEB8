import List from "../components/List";
import Bookmarks from "../components/Bookmarks";
import UsingProducts from "../components/UsingProducts";
import { useState } from "react";

const userName = "gyunho";
const skinType = "건성";

function MyPage() {
  const [navButton, setNavButton] = useState(0);

  return (
    <div>
      <div>
        <img alt="profile" src="../images/profile-user.png" />
        <h2>{userName}</h2>
        <h2>피부타입 : {skinType}</h2>
      </div>
      <div>
        <button
          onClick={() => {
            setNavButton(0);
          }}
        >
          내가 작성한 글
        </button>
        <button
          onClick={() => {
            setNavButton(1);
          }}
        >
          즐겨찾기
        </button>
        <button
          onClick={() => {
            setNavButton(2);
          }}
        >
          사용 제품 기록
        </button>
      </div>
      {navButton === 0 && (
        <div>
          <List title="Post" />
          <List title="comments" />
        </div>
      )}
      {navButton === 1 && (
        <div>
          <Bookmarks />
        </div>
      )}
      {navButton === 2 && (
        <div>
          <UsingProducts />
        </div>
      )}
    </div>
  );
}
export default MyPage;
