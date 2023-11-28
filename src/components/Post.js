const Post = ({ post, onClick }) => {
  return (
    <div onClick={onClick}>
      <div className="post_title_sum">{post.title}</div>
      <div className="user_info">{post.userName}</div>
      <div>{post.timestamp}</div>
      <div className="post_cont_sum">
        {post.content.length > 200
          ? post.content.substring(0, 200) + "..."
          : post.content}
      </div>
      <div className="post_skin">{post.userSkinType}</div>
    </div>
  );
};

export default Post;
