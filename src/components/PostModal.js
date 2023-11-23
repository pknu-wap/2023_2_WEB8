import React from "react";
import Like from "./Like";
import Comment from "./Comment";

const PostModal = ({ post, onClose }) => {
  if (!post) {
    return null;
  }

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
          <div className="user_info">{post.userName}</div>
          <div className="post_skin">{post.userSkinType}</div>
          <div>{post.timestamp}</div>
          <div className="post_cont_sum">{post.content}</div>
          <Like postId={post.id} postLikes={post.likes} style />
          <Comment postId={post.id} />
        </div>
      </div>
    </div>
  );
};

export default PostModal;
