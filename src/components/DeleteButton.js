// components/DeleteButton.js

import React from "react";
import deletePostInFirestore from "../functions/deletePost";

const DeleteButton = ({ postId }) => {
  console.log(postId);
  // postId를 받아와 해당 게시물을 삭제
  const handleDeletePost = () => {
    deletePostInFirestore(postId);
  };

  return <button onClick={handleDeletePost}>게시물 삭제</button>;
};

export default DeleteButton;
