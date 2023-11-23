import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./community_style.css";
import "./community_post.css";
import Navbars2 from "../components/Navbars2.js";
import Like from "../components/Like.js";
import useAuth from "../functions/useAuth.js";
import createPostInFirestore from "../functions/createPostInFirestore.js";
import fetchPosts from "../functions/fetchPosts.js";
import PostModal from "../components/PostModal";
import deletePostInFirestore from "../functions/deletePost.js";

const Community = () => {
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const currentUser = useAuth();

  useEffect(() => {
    fetchPosts(setPosts);
  }, []);
  // 새로운 게시물을 배열 맨 앞에 추가하여 최신순으로 정렬

  const handleSubmit = () => {
    const newPost = { title: postTitle, content: postContent };
    createPostInFirestore(currentUser, newPost); //포스트를 파이어베이스에 등록함

    setCreateModalVisible(false);
    setPostTitle("");
    setPostContent("");
  };

  const [selectedPost, setSelectedPost] = useState(null);

  // 게시물 클릭 시 해당 게시물의 상세 내용을 보여주는 함수
  const handlePostClick = (post) => {
    setSelectedPost(post);
    setDetailModalVisible(true); // 게시물 클릭 시 모달 열기
  };

  const openCreateModal = () => setCreateModalVisible(true);
  const closeModal = () => {
    setSelectedPost(null);
    // 두 모달 모두 닫기
    setCreateModalVisible(false);
    setDetailModalVisible(false);
    setPostTitle("");
    setPostContent("");
  };

  return (
    <div>
      <Navbars2 />
      <div className="main">
        <div className="user_profile">
          <img src="./images/profile.png" alt="사용자 프로필 사진" />
          <button className="write_post_btn" onClick={openCreateModal}>
            게시물 작성하기
          </button>
        </div>

        <div className="post_list">
          {posts.map((post) => {
            return (
              <div
                key={post.id}
                className="post_summary"
                onClick={() => handlePostClick(post)}
              >
                <div className="post_title_sum">{post.title}</div>
                <div className="user_info">{post.userName}</div>
                <div>{post.timestamp}</div>
                <div className="post_cont_sum">
                  {post.content.length > 200
                    ? post.content.substring(0, 200) + "..."
                    : post.content}
                </div>
                <div className="post_skin">{post.userSkinType}</div>
                <Like postId={post.id} postLikes={post.likes} />
              </div>
            );
          })}
        </div>

        <PostModal
          user={currentUser}
          post={selectedPost}
          onClose={() => setDetailModalVisible(false)}
          isVisible={isDetailModalVisible}
        />

        <div
          className="modal"
          style={{ display: isCreateModalVisible ? "block" : "none" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2>게시물 작성</h2>
              <span className="close" onClick={closeModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <textarea
                name="post_title"
                id="post_title"
                placeholder="제목"
                cols="110"
                rows="1"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              ></textarea>
              <textarea
                name="post_content"
                id="post_content"
                placeholder="게시물 작성하기"
                cols="110"
                rows="20"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              ></textarea>
            </div>
            <div className="post_submit_btn">
              <button id="post_submit_btn" onClick={handleSubmit}>
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
