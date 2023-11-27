import React from "react";
import Like from "./Like";
import Comment from "./Comment";
import DeleteButton from "./deleteButton";
import "../css/community_style.css";
import useAuth from "../functions/useAuth";

const PostModal = ({ post, onClose, currentUser, isVisible, setIsUpdate }) => {
  if (!post || !isVisible) {
    return null;
  }

  const userName = currentUser.userName;
  const isCurrentUserPost = post.uid === currentUser.uid;

  const handleDeletePost = () => {
    setIsUpdate((prev) => !prev);
    onClose(); // 모달 닫기
  };

  return (
    <div className="modal" style={{ display: post ? "block" : "none" }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{post.title}</h2>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="post_info">
            <div className="user_info">작성자 : {post.userName} | </div>
            <div className="post_skin">피부 타입 : {post.userSkinType} |</div>
            <div>작성일 : {post.timestamp}</div>
          </div>
          <div className="post_cont_sum">{post.content}</div>
          <Like postId={post.id} postLikes={post.likes} style />
          <Comment postId={post.id} uid={post.uid} userName={userName} />
          {isCurrentUserPost && (
            <DeleteButton
              postId={post.id}
              post={post}
              onDelete={handleDeletePost}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostModal;
