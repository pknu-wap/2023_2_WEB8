import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const fetchFavorProducts = async (setProducts, userid) => {
  try {
    const docRef = doc(db, "Users", userid);
    const userSnapshot = await getDoc(docRef);

    if (userSnapshot.exists()) {
      const favorites = userSnapshot.data().favorites || [];

      const productQuery = query(
        collection(db, "Products"),
        where("Name", "in", favorites)
      );

      const querySnapshot = await getDocs(productQuery);
      const favorProducts = [];

      querySnapshot.forEach((doc) => {
        favorProducts.push(doc.data());
      });

      setProducts(favorProducts);
    }
  } catch (error) {
    console.error("Error in fetchFavorProducts <<< ", error);
  }
};
export default fetchFavorProducts;
