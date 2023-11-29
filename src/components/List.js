import "../css/List.css";
import Post from "./Post";
import fetchPostsByUid from "../functions/fetchPostsByUid";
import { useEffect, useState } from "react";
import useAuth from "../functions/useAuth";
import Like from "./Like";
import PostModal from "../components/PostModal.js";

function List(prop) {
  const { title, userInfo } = prop;
  const [posts, setPosts] = useState([]);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(true);
  const currentUser = useAuth();

  useEffect(() => {
    fetchPostsByUid(setPosts, userInfo, title);
  }, [userInfo, title]);

  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setDetailModalVisible(true); // 게시물 클릭 시 모달 열기
  };

  const closeModal = () => {
    setSelectedPost(null);
    setDetailModalVisible(false);
  };

  return (
    <div className="list-container">
      <h3 className="list-title">{title}</h3>
      {posts.map((post, index) => {
        return (
          <div
            key={index}
            className="article-container"
            onClick={() => handlePostClick(post)}
            style={{ cursor: "pointer" }}
          >
            <Post post={post} />
            <Like
              postId={post.id}
              postLikes={post.likes.length}
              uid={userInfo.uid}
              user={currentUser}
            />
          </div>
        );
      })}

      <PostModal
        setIsUpdate={setIsUpdate}
        currentUser={currentUser}
        post={selectedPost}
        onClose={closeModal}
        isVisible={isDetailModalVisible}
      />
    </div>
  );
}

export default List;
