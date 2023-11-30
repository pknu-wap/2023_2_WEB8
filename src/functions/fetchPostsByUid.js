import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
} from "@firebase/firestore";
import formatTime from "./formatTime";

const fetchPostsByUid = async (setPosts, userInfo, title) => {
  const uid = userInfo.uid;

  try {
    const q = query(
      collection(db, title),
      where("userid", "==", uid),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);

    const postPromises = querySnapshot.docs.map((doc) => {
      const post = doc.data();
      const milliTime = post.timestamp;
      const createdTime = formatTime(milliTime);

      return {
        id: post.id || post,
        timestamp: createdTime,
        uid: post.userid,
        title: post.title,
        content: post.content,
        userName: post.userName,
        userSkinType: post.userSkinType || "",
        likes: post.likes || 0,
      };
    });

    const postsData = await Promise.all(postPromises);
    setPosts(postsData);
  } catch (error) {
    console.log("Error in fetching Posts 2  <<<  ", error);
  }
};

export default fetchPostsByUid;
