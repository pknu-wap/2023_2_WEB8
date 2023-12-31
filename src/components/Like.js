import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Like = ({ postId, postLikes, user, isUpdate, setIsUpdate }) => {
  const [liked, setLiked] = useState(false);
  const [likedNum, setLikedNum] = useState(postLikes);
  const navigate = useNavigate();

  useEffect(() => {
    fetchIsLiked();
  }, []);

  const fetchIsLiked = async () => {
    if (user) {
      const uid = user.uid;
      const userRef = doc(db, "Users", uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userLikedPosts = userSnapshot.data().likes || [];
        setLiked(userLikedPosts.includes(postId));
      }
      if (typeof postId === "string") {
        const docRef = doc(db, "Posts", postId);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const postData = snapshot.data();
          const postLike = postData.likes || [];
          setLikedNum(postLike.length);
        }
      }
    }
  };

  const LikedFunc = async (postId, liked) => {
    // Firestore에서 해당 게시물의 정보 가져오기
    const uid = user.uid;
    const docRef = doc(db, "Posts", postId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const postData = snapshot.data();
      const postLike = postData.likes || [];

      if (liked) {
        //좋아요를 눌렀을 때
        postLike.push(uid);
        console.log("Incremented likes by 1");
      } else {
        //좋아요를 해제했을 때
        const index = postLike.indexOf(uid);
        if (index > -1) {
          postLike.splice(index, 1);
        }
        console.log("Decremented likes by 1");
      }
      await updateDoc(docRef, { likes: postLike });
      setLikedNum(postLike.length);

      //User에 좋아요 게시글 필드 만들기
    } else {
      console.log("Document not found.");
    }

    const userRef = doc(db, "Users", uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userLike = userDoc.data().likes || [];

      if (liked && !userLike.includes(postId)) {
        userLike.push(postId);
      } else {
        const index = userLike.indexOf(postId);
        if (index > -1) {
          userLike.splice(index, 1);
        }
      }

      await updateDoc(userRef, { likes: userLike });
    }
  };

  const handleLikeClick = () => {
    if (user) {
      LikedFunc(postId, !liked);
      setIsUpdate(!isUpdate);
      setLiked(!liked);
    } else {
      alert("로그인이 필요한 서비스입니다.");
      navigate(`${process.env.PUBLIC_URL}/login`);
      return;
    }
  };

  return (
    <div className="heart" onClick={handleLikeClick}>
      {liked ? (
        <FontAwesomeIcon icon={fasHeart} size="sm" color="red" />
      ) : (
        <FontAwesomeIcon icon={farHeart} size="sm" />
      )}
      <span>{likedNum === undefined ? 0 : likedNum}</span>
    </div>
  );
};

export default Like;
