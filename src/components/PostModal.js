import React from "react";
import Like from "./Like";
import Comment from "./Comment";
import DeleteButton from "./DeleteButton";

const PostModal = ({ post, onClose, isVisible, user }) => {
  if (!post) {
    return null;
  }
  console.log(onClose);

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
          <DeleteButton postId={post.id} />
          <Comment postId={post.id} />
        </div>
      </div>
    </div>
  );
};

export default PostModal;
