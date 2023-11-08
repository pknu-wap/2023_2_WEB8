import { db } from "../firebase";
import { collection, where, getDocs, query } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const fetchData = async (setProducts, skinType) => {
  const q = query(
    collection(db, "Products"),
    where("Rank", ">=", 4.9),
    where(skinType, "==", 1)
  );
  console.log(skinType);
  const querySnapshot = await getDocs(q);
  const storage = getStorage();

  const productData = [];

  querySnapshot.forEach((doc) => {
    const product = doc.data();
    // const imageURL = await getDownloadURL(
    //   ref(storage, `products/${product.id + ".jpg"}`)
    // );
    console.log(doc.data());

    productData.push({
      Id: product.Id,
      Brand: product.Brand,
      Name: product.Name,
      Label: product.Label,
      Rank: product.Rank,
      Price: product.Price,
    });
  });

  setProducts(productData);
};

export default fetchData;
