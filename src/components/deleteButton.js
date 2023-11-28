// components/DeleteButton.js
import React, { useState } from "react";
import deletePostInFirestore from "../functions/deletePost";
import useAuth from "../functions/useAuth";
import "../css/community_style.css";

const DeleteButton = ({ postId, post, onDelete }) => {
  const [isDeleted, setDeleted] = useState(false);

  const handleDeletePost = async () => {
    try {
      await deletePostInFirestore(postId);
      console.log("삭제가 완료되었습니다.");
      setDeleted(true);
      onDelete(); // onDelete 함수 호출
    } catch (error) {
      console.error("게시물 삭제 중 오류 발생:", error);
    }
  };
  // isCurrentUserPost를 사용하여 현재 사용자와 게시물의 작성자를 비교
  const user = useAuth();
  const isCurrentUserPost = user && post.uid === user.uid;

  // 게시물이 삭제된 경우 렌더링하지 않음
  if (isDeleted) {
    return null;
  }

  // 현재 사용자가 게시물의 작성자인 경우에만 삭제 버튼을 표시
  return isCurrentUserPost ? (
    <button className="delete-btn" onClick={handleDeletePost}>
      게시물 삭제
    </button>
  ) : null;
};

export default DeleteButton;
