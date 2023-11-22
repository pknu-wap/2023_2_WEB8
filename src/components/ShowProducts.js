import Product from "./Product";
import { useEffect, useState } from "react";
import fetchData from "../functions/fetchData";

function ShowProducts(props) {
  const [products, setProducts] = useState([]);
  const { skinType, userUid, orderBy } = props;
  useEffect(() => {
    //if (userUid !== undefined) fetchData(setProducts, { userUid: userUid });
    if (skinType !== undefined)
      fetchData(setProducts, { skinType: skinType, orderCriteria: orderBy });
    else console.log("error in ShowProducts");
  }, [skinType, userUid, orderBy]);

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
              uid={userUid}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ShowProducts;
