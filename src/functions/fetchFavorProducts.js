import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const fetchFavorProducts = async (setProducts, userid) => {
  try {
    const docRef = doc(db, "Users", userid);
    const userSnapshot = await getDoc(docRef);
    const storage = getStorage();

    if (userSnapshot.exists()) {
      const favorites = userSnapshot.data().favorites || [];

      if (favorites.length === 0) {
        setProducts([]);
        return;
      }

      const productQuery = query(
        collection(db, "Products"),
        where("Name", "in", favorites)
      );

      const querySnapshot = await getDocs(productQuery);
      const productPromises = querySnapshot.docs.map(async (doc) => {
        const product = doc.data();
        let imageURL = "";

        try {
          imageURL = await getDownloadURL(
            ref(storage, `products_image/${product.Name + ".jpeg"}`)
          );
        } catch (error) {
          console.log("No img in product >>> ", error);
          imageURL = "/images/5.jpg";
        }

        return {
          id: doc.id,
          Brand: product.Brand,
          Name: product.Name,
          Label: product.Label,
          Rank: product.Rank,
          Price: product.Price,
          Ingredients: product.Ingredients,
          imgURL: imageURL,
        };
      });

      const productData = await Promise.all(productPromises);
      setProducts(productData);
    }
  } catch (error) {
    console.error("Error in fetchFavorProducts <<< ", error);
  }
};
export default fetchFavorProducts;
