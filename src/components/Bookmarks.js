import Product from "./Product";
import { useEffect, useState } from "react";
import fetchData from "../functions/fetchData";

function Bookmarks() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchData(setProducts, "Sensitive");
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

export default Bookmarks;
