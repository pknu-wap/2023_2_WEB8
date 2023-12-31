import Product from "./Product";
import { useEffect, useState } from "react";
import fetchData from "../functions/fetchData";
import "../css/Product.css";

function ShowProducts(props) {
  const [products, setProducts] = useState([]);
  const { skinType, userUid, orderBy } = props;

  useEffect(() => {
    fetchData(setProducts, { skinType: skinType, orderCriteria: orderBy });
  }, [skinType, userUid, orderBy]);

  return (
    <div className="product-list">
      {products.map((product, index) => {
        return (
          <div className="products" key={index}>
            <Product productInfo={product} uid={userUid} />
          </div>
        );
      })}
    </div>
  );
}

export default ShowProducts;
