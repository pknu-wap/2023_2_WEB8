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
            <Product
              id={product.id}
              name={product.Name}
              price={product.Price}
              brand={product.Brand}
              label={product.Label}
              rank={product.Rank}
              uid={userInfo.uid}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Favorites;
