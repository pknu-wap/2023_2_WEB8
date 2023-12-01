import Product from "./Product";
import { useEffect, useState } from "react";
import fetchFavorProducts from "../functions/fetchFavorProducts";
import "../css/Favorites.css";

function Favorites({ userInfo }) {
  const [products, setProducts] = useState([]);
  const [isUpdate, setIsUpdate] = useState(true);
  const userid = userInfo.uid;

  useEffect(() => {
    fetchFavorProducts(setProducts, userid);
  }, [userid, isUpdate]);

  return (
    <div className="favorites-container">
      {products.map((product, index) => {
        return (
          <div key={index} className="favorites-product">
            <Product
              productInfo={product}
              uid={userInfo.uid}
              isUpdate={isUpdate}
              setIsUpdate={setIsUpdate}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Favorites;
