import React from "react";
import Like from "./Like";
import Comment from "./Comment";
import DeleteButton from "./deleteButton";
import useAuth from "../functions/useAuth";

const PostModal = ({ post, onClose }) => {
  const user = useAuth(); // useAuth 훅을 사용하여 사용자 정보 얻어오기
  // console.log(user);
  // console.log(post);

  if (!post) {
    return null;
  }

  const isCurrentUserPost = user && post.uid === user.uid;

  const handleDeletePost = () => {
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
          <Like postId={post.id} postLikes={post.likes} style />
          <Comment postId={post.id} />
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
