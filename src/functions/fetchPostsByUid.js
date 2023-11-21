import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
} from "@firebase/firestore";
import formatTime from "./formatTime";

const fetchPosts = async (setPosts, userInfo, title) => {
  const uid = userInfo.uid;
  try {
    const q = query(
      collection(db, title),
      where("userid", "==", uid),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);

    const postsData = [];

    querySnapshot.forEach((doc) => {
      const post = doc.data();
      const milliTime = post.timestamp;
      const createdTime = formatTime(milliTime);

      postsData.push({
        id: post.id,
        timestamp: createdTime,
        uid: post.uid,
        title: post.title,
        content: post.content,
        userName: post.userName,
        userSkinType: post.userSkinType,
        likes: post.likes || 0,
      });
    });

    setPosts(postsData);
  } catch (error) {
    console.log("Error in fetching Posts  <<<  ", error);
  }
};

export default fetchPosts;
