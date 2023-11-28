import Product from "./Product";
import { useEffect, useState } from "react";
import fetchFavorProducts from "../functions/fetchFavorProducts";
import "../css/Favorites.css";

function Favorites({ userInfo }) {
  const [products, setProducts] = useState([]);
  const userid = userInfo.uid;

  useEffect(() => {
    fetchFavorProducts(setProducts, userid);
  }, [userid]);

  return (
    <div className="favorites-container">
      {products.map((product) => {
        return (
          <div key={product.id} className="favorites-product">
            <Product productInfo={product} uid={userInfo.uid} />
          </div>
        );
      })}
    </div>
  );
}

export default Favorites;
