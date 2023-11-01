import Product from "./Product";
import { Row, Col, Container, ListGroup } from "react-bootstrap";

//임의의 데이터
const MyUsingProduct = [
  {
    product_id: 1,
    product_name: "시금치",
    product_img: "images/spinach.jpg",
  },
  {
    product_id: 2,
    product_name: "handmade",
    product_img: "images/handmade.jpg",
  },
  {
    product_id: 3,
    product_name: "night mode",
    product_img: "images/night_mode.png",
  },
];

function UsingProducts() {
  return (
    <Row className="row-cols-3">
      {MyUsingProduct.map((product) => {
        return (
          <Col>
            <Product
              id={product.product_id}
              name={product.product_name}
              img={product.product_img}
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default UsingProducts;
