import Product from "./Product";
import { useEffect, useState } from "react";
import fetchData from "../functions/fetchData";

function Favorites({ userInfo }) {
  const [products, setProducts] = useState([]);
  const skinType = userInfo.skinType;

  useEffect(() => {
    fetchData(setProducts, { skinType });
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
              uid={userInfo.uid}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Favorites;
