import "../css/List.css";
import Post from "./Post";
import fetchPostsByUid from "../functions/fetchPostsByUid";
import { useEffect, useState } from "react";
import Like from "./Like";

function List(prop) {
  const { title, userInfo } = prop;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPostsByUid(setPosts, userInfo, title);
  }, [userInfo, title]);

  return (
    <div className="list-container">
      <h3 className="list-title">{title}</h3>
      {posts.map((post, index) => {
        return (
          <div key={index} className="article-container">
            <Post post={post} />
            <Like
              postId={post.id}
              postLikes={post.likes.length}
              uid={userInfo.uid}
            />
          </div>
        );
      })}
    </div>
  );
}

export default List;
