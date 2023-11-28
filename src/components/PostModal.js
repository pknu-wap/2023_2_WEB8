import React from "react";
import Like from "./Like";
import Comment from "./Comment";
import DeleteButton from "./deleteButton";

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
          <div className="user_info">{post.userName}</div>
          <div className="post_skin">{post.userSkinType}</div>
          <div>{post.timestamp}</div>
          <div className="post_cont_sum">{post.content}</div>
          <Like
            postId={post.id}
            postLikes={post.likes.length}
            user={currentUser}
          />
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
