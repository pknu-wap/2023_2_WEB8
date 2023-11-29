import Like from "./Like";
import Comment from "./Comment";
import DeleteButton from "./deleteButton";
import "../css/community_style.css";

const PostModal = ({ post, onClose, currentUser, isVisible, setIsUpdate }) => {
  if (!post || !isVisible) {
    return null;
  }

  const isCurrentUserPost = currentUser && post.uid === currentUser.uid;

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
            {isCurrentUserPost && (
              <DeleteButton
                postId={post.id}
                post={post}
                onDelete={handleDeletePost}
              />
            )}
          </div>
          <div className="post_cont_sum">{post.content}</div>
          <Like
            postId={post.id}
            postLikes={post.likes.length}
            user={currentUser}
          />
          <Comment postId={post.id} uid={post.uid} user={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default PostModal;
