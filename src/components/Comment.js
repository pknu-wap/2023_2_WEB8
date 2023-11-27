import React, { useEffect, useState } from "react";
import "../css/Comment.css";
import { db } from "../firebase";
import {
  addDoc,
  serverTimestamp,
  collection,
  orderBy,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import formatTime from "../functions/formatTime";

const Comment = ({ postId, uid, userName }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment) {
      alert("내용을 입력하세요");
    } else {
      createCommentInFirestore();
      setNewComment("");
    }
  };

  useEffect(() => {
    fetchComment(setComments);
  });

  const createCommentInFirestore = async () => {
    try {
      const docRef = await addDoc(collection(db, "Comments"), {
        postId: postId,
        userId: uid,
        userName: userName,
        content: newComment,
        timestamp: serverTimestamp(),
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
              <div>{comment.content}</div>
            </li>
          );
        })}
      </ul>
      <form>
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
