import Product from "./Product";
import { useEffect, useState } from "react";
import fetchData from "../functions/fetchData";

function ShowProducts(props) {
  const [products, setProducts] = useState([]);
  const { skinType, userUid } = props;
  useEffect(() => {
    if (userUid !== undefined) fetchData(setProducts, { userUid: userUid });
    else if (skinType !== undefined)
      fetchData(setProducts, { skinType: skinType });
    else console.log("error in ShowProducts");
  }, [skinType, userUid]);

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
