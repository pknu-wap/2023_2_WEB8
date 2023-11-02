import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const fetchData = async (setProducts) => {
  const querySnapshot = await getDocs(collection(db, "products"));
  const storage = getStorage();

  const productData = [];

  for (const doc of querySnapshot.docs) {
    const product = doc.data();
    const imageURL = await getDownloadURL(
      ref(storage, `products/${product.id + ".jpg"}`)
    );

    productData.push({
      id: product.id,
      name: product.name,
      img: imageURL,
      price: product.price,
    });
  }

  setProducts(productData);
};

export default fetchData;
