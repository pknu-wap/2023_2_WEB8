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
      {products.map((product) => {
        return (
          <div className="products" key={product.id}>
            <Product
              id={product.id}
              name={product.Name}
              price={product.Price}
              brand={product.Brand}
              label={product.Label}
              rank={product.Rank}
              uid={userUid}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ShowProducts;
