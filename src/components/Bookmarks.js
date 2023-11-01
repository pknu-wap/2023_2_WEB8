import Product from "./Product";
import { Row, Col, Container, ListGroup } from "react-bootstrap";

//임의의 데이터
const myBookmarks = [
  {
    product_id: 1,
    product_name: "하삼동커피",
    product_img: "images/hasandong.jpg",
  },
  {
    product_id: 2,
    product_name: "로지텍",
    product_img: "images/logitec.jpg",
  },
  {
    product_id: 3,
    product_name: "베트남쌀국수",
    product_img: "images/guksu.webp",
  },
];

function Bookmarks() {
  return (
    <Row className="row-cols-3">
      {myBookmarks.map((bookmark) => {
        return (
          <Col>
            <Product
              id={bookmark.product_id}
              name={bookmark.product_name}
              img={bookmark.product_img}
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default Bookmarks;
