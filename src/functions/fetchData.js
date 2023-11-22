import { db } from "../firebase";
import { collection, where, getDocs, query, orderBy } from "firebase/firestore";
//import { getStorage, ref, getDownloadURL } from "firebase/storage";

const fetchData = async (setProducts, { skinType, userUid, orderCriteria }) => {
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
    //const storage = getStorage();

    const productData = [];

    querySnapshot.forEach((doc) => {
      const product = doc.data();
      // const imageURL = await getDownloadURL(
      //   ref(storage, `products/${product.id + ".jpg"}`)
      // );

      productData.push({
        id: doc.id,
        Brand: product.Brand,
        Name: product.Name,
        Label: product.Label,
        Rank: product.Rank,
        Price: product.Price,
      });
    });

    setProducts(productData);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export default fetchData;
