import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const LikedFunc = async (postId, liked) => {
  // Firestore에서 해당 게시물의 정보 가져오기
  const docRef = doc(db, "Posts", postId);
  const snapshot = await getDoc(docRef);
  console.log(docRef);

  if (snapshot.exists()) {
    const postData = snapshot.data();
    const currentLikes = postData.likes || 0;

    if (liked) {
      if (!postData.hasOwnProperty("likes")) {
        await setDoc(docRef, { likes: 1 }, { merge: true });
        console.log("Likes field created and set to 1");
      } else {
        await updateDoc(docRef, { likes: currentLikes + 1 });
        console.log("Incremented likes by 1");
      }
    } else {
      if (postData.hasOwnProperty("likes")) {
        if (currentLikes > 0) {
          await updateDoc(docRef, { likes: currentLikes - 1 });
          console.log("Decremented likes by 1");
        } else {
          console.log("Likes cannot be negative");
        }
      }
    }
  } else {
    console.log("Document not found.");
  }
};

export default LikedFunc;
