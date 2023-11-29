import { db } from "../firebase";
import {
  collection,
  where,
  getDocs,
  query,
  orderBy,
  collectionGroup,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const fetchData = async (setProducts, { skinType, userid, orderCriteria }) => {
  try {
    let q = collection(db, "Products");

    q = query(q, where("Rank", ">=", 4.9), orderBy("Rank", "desc"));

    if (skinType) q = query(q, where(skinType, "==", 1));

    let orderByField = "Rank"; // Default orderBy field

    if (orderCriteria === "lowest-price") {
      orderByField = "Price";
    } else if (orderCriteria === "highest-price") {
      orderByField = "Price";
    }

    const querySnapshot = await getDocs(q);
    const storage = getStorage();

    const productPromises = querySnapshot.docs.map(async (doc) => {
      const product = doc.data();
      let imageURL = "";

      try {
        imageURL = await getDownloadURL(
          ref(storage, `products_image/${product.Name + ".jpeg"}`)
        );
      } catch (error) {
        console.log("No img in product >>> ", error);
        imageURL = "";
        console.log("error imageURL: ", imageURL);
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

    // Sort the data if orderByField is "favorites"
    if (orderCriteria === "favorites") {
      productData.sort((a, b) => {
        // If "favorites" field is absent, consider it as a lower value
        const aValue = a.hasOwnProperty("favorites")
          ? a.favorites
          : Number.MIN_SAFE_INTEGER;
        const bValue = b.hasOwnProperty("favorites")
          ? b.favorites
          : Number.MIN_SAFE_INTEGER;

        return bValue - aValue;
      });
    } else {
      // Default orderBy based on orderByField
      productData.sort((a, b) => a[orderByField] - b[orderByField]);
    }

    setProducts(productData);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export default fetchData;
