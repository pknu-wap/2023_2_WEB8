import Product from "./Product";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import fetchData from "../functions/fetchData";

function UsingProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchData(setProducts);
  }, []);

  return (
    <Row className="row-cols-3" style={{ minWidth: "1008px" }}>
      {products.map((product) => {
        return (
          <Col>
            <Product
              id={product.id}
              name={product.name}
              img={product.img}
              price={product.price}
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default UsingProducts;
