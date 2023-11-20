import { collection, updateDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const createIdinProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Products"));

    querySnapshot.forEach(async (productDoc) => {
      const productRef = doc(db, "Products", productDoc.id);
      console.log(productDoc.id);
      await updateDoc(productRef, {
        id: productDoc.id,
      });
    });
  } catch (error) {
    console.error("Error updating IDs in Products: ", error);
  }
};

export default createIdinProducts;
