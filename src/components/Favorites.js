import Product from "./Product";
import { useEffect, useState } from "react";
import fetchFavorProducts from "../functions/fetchFavorProducts";

function Favorites({ userInfo }) {
  const [products, setProducts] = useState([]);
  const userid = userInfo.uid;

  useEffect(() => {
    fetchFavorProducts(setProducts, userid);
  }, [userid]);

  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <Product productInfo={product} uid={userInfo.uid} />
          </div>
        );
      })}
    </div>
  );
}

export default Favorites;
