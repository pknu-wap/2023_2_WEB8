import List from "../components/List";
import Bookmarks from "../components/Bookmarks";
import UsingProducts from "../components/UsingProducts";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, ListGroup } from "react-bootstrap";
import useAuth from "../functions/useAuth";
import Navbars from "../components/Navbars";

function MyPage() {
  const [navButton, setNavButton] = useState(0);

  const currentUser = useAuth();

  console.log(currentUser);
  if (currentUser == null) {
    return <div>Loading...</div>;
  }
  if (!currentUser) {
    return <div>Please log in.</div>;
  }

  return (
    <div>
      <Navbars />
      <Container>
        <div className="row">
          <div className="col-sm-3">
            <img
              alt="profile"
              src="/images/profile-user.png"
              style={{ objectFit: "cover", width: "250px" }}
            />
          </div>
          <div className="col-sm-9">
            <div className="col-9">
              <h2>안녕하세요. {currentUser.userName}님!</h2>
            </div>
            <div className="col-9">
              <h2>피부타입 : {currentUser.skinType}</h2>
            </div>
          </div>
        </div>
      </Container>
      <Container className="d-flex justify-content-center">
        <ListGroup style={{ minWidth: "280px" }}>
          <ListGroup.Item
            as="li"
            active={navButton === 0}
            onClick={() => {
              setNavButton(0);
            }}
            style={{ cursor: "pointer" }}
          >
            내가 작성한 글
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            active={navButton === 1}
            onClick={() => {
              setNavButton(1);
            }}
            style={{ cursor: "pointer" }}
          >
            즐겨찾기
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            active={navButton === 2}
            onClick={() => {
              setNavButton(2);
            }}
            style={{ cursor: "pointer" }}
          >
            사용 제품 기록
          </ListGroup.Item>
        </ListGroup>
        {navButton === 0 && (
          <div style={{ marginRight: "90px" }}>
            <List title="Posts" />
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
      </Container>
    </div>
  );
}
export default MyPage;
