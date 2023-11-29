const Post = ({ post, onClick }) => {
  return (
    <div onClick={onClick}>
      <div className="post_title_sum">{post.title}</div>
      <div className="post_info">
        <div className="user_info">작성자 : {post.userName} | </div>
        <div className="post_skin">피부 타입 : {post.userSkinType} |</div>
        <div>작성일 : {post.timestamp}</div>
      </div>
      <div className="post_cont_sum">
        {post.content.length > 200
          ? post.content.substring(0, 200) + "..."
          : post.content}
      </div>
    </div>
  );
};

export default Post;
