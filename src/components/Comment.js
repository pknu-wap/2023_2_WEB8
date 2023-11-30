import React, { useEffect, useState } from "react";
import "../css/Comment.css";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  orderBy,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import formatTime from "../functions/formatTime";
import { useNavigate } from "react-router-dom";

const Comment = ({ postId, uid, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isUpdate, setIsUpdate] = useState(true);
  const navigate = useNavigate();

  //실시간 업데이트를 위한 state
  //버튼을 클릭할때 변경되도록 함
  //=> useEffect의 의존성배열에 넣음 => 버튼을 클릭할 때마다 fetch함

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      // 비로그인 상태에서는 로그인이 필요하다는 메시지를 띄우고 로그인 화면으로 이동
      alert("로그인이 필요한 서비스입니다.");
      // 로그인 화면으로 이동하는 코드
      navigate(`${process.env.PUBLIC_URL}/login`);

      return;
    }

    if (!newComment) {
      alert("내용을 입력하세요");
    } else {
      createCommentInFirestore();
      setNewComment("");
      setIsUpdate((prev) => !prev);
    }
  };

  useEffect(() => {
    fetchComment(setComments);
  }, [isUpdate]);

  const createCommentInFirestore = async () => {
    try {
      await addDoc(collection(db, "Comments"), {
        postId: postId,
        userid: user.uid,
        userName: user.userName,
        content: newComment,
        timestamp: new Date(),
      });
    } catch (error) {
      console.log("Error in createCommentInFirestore of Comment <<< ", error);
    }
  };

  const fetchComment = async (setComments) => {
    try {
      const q = query(
        collection(db, "Comments"),
        where("postId", "==", postId),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const commentData = [];

      querySnapshot.forEach((doc) => {
        const comment = doc.data();
        const milliTime = comment.timestamp;
        const createdTime = formatTime(milliTime);

        commentData.push({
          commentId: doc.id,
          userName: comment.userName,
          timestamp: createdTime,
          userNamd: comment.userName,
          uid: comment.userId,
          content: comment.content,
          postId: comment.postId,
        });
      });

      setComments(commentData);
    } catch (error) {
      console.log("Error in fetchComment of Comment <<< ", error);
    }
  };

  return (
    <div className="comment-container">
      <h4 className="comment-header">댓글</h4>
      <ul className="comment-list">
        {comments.map((comment, index) => {
          return (
            <li key={index} className="comment-item">
              <div>{comment.userName}</div>
              <div>{comment.timestamp}</div>
              <div>{comment.content}</div>
            </li>
          );
        })}
      </ul>
      <form className="comment-box">
        <input
          type="text"
          placeholder="댓글 작성..."
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          className="comment-input"
        />
        <button onClick={handleSubmit} className="comment-submit">
          ↑
        </button>
      </form>
    </div>
  );
};

export default Comment;
