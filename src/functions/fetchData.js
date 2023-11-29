import { db } from "../firebase";
import { collection, where, getDocs, query, orderBy } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const fetchData = async (setProducts, { skinType, userid, orderCriteria }) => {
  //userUid를 사용하는 경우와 skinType을 사용하는 경우를 처리해야함
  //userUid -> mypage, skinType -> main페이지
  try {
    let q = collection(db, "Products");

    q = query(q, where("Rank", ">=", 4.9), orderBy("Rank", "desc"));

    if (skinType) q = query(q, where(skinType, "==", 1));

    if (orderCriteria === "lowest-price") {
      q = query(q, orderBy("Price"));
    } else if (orderCriteria === "highest-price") {
      q = query(q, orderBy("Price", "desc"));
    } else if (orderCriteria === "favorites") {
      // 기본적으로 orderBy Rank & favorites 으로 설정
      q = query(q, orderBy("favorites", "desc"));
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

    setProducts(productData);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export default fetchData;
