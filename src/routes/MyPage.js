import List from "../components/List";
import Bookmarks from "../components/Bookmarks";
import UsingProducts from "../components/UsingProducts";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, ListGroup } from "react-bootstrap";

const userName = "gyunho";
const skinType = "건성";

function MyPage() {
  const [navButton, setNavButton] = useState(0);

  return (
    <div>
      <Container>
        <div class="row">
          <div class="col-sm-3">
            <img
              alt="profile"
              src="/images/profile-user.png"
              style={{ objectFit: "cover", width: "250px" }}
            />
          </div>
          <div class="col-sm-9">
            <div class="col-3">
              <h2>{userName}</h2>
            </div>
            <div class="col-3">
              <h2>피부타입 : {skinType}</h2>
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
