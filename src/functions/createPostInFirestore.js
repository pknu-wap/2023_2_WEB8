import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const createPostInFirestore = async (user, article) => {
  //user와 article을 객체로 받아 사용한다
  //user.uid, user.userName, article.title, article.content
  try {
    const { uid, userName, skinType } = user;
    const { title, content } = article;

    await addDoc(collection(db, "Posts"), {
      uid: uid,
      userName: userName,
      userSkinType: skinType,
      title: title,
      content: content,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding post data to firestore: ", error);
  }
};

export default createPostInFirestore;
