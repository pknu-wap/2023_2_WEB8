import Product from "./Product";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import fetchData from "../functions/fetchData";

function Bookmarks() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchData(setProducts, "Sensitive");
  }, []);

  return (
    <Row className="row-cols-3" style={{ minWidth: "1008px" }}>
      {products.map((product) => {
        return (
          <Col key={product.Id} style={{ width: "auto" }}>
            <Product
              id={product.Id}
              name={product.Name}
              price={product.Price}
              brand={product.Brand}
              label={product.Label}
              rank={product.Rank}
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default Bookmarks;
