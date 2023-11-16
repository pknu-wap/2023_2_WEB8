import Product from "./Product";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import fetchData from "../functions/fetchData";

function ShowProducts({ skinType, userUid }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (userUid) fetchData(setProducts, userUid);
    else if (skinType) fetchData(setProducts, skinType);
    else console.log("error in ShowProducts");
  }, []);

  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.Id}>
            <Product
              id={product.Id}
              name={product.Name}
              price={product.Price}
              brand={product.Brand}
              label={product.Label}
              rank={product.Rank}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ShowProducts;
