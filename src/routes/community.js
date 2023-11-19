import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./community_style.css";
import "./community_post.css";
import Navbars from "../components/Navbars.js";
import Like from "../components/Like.js";
import useAuth from "../functions/useAuth.js";
import createPostInFirestore from "../functions/createPostInFirestore.js";

const Community = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const currentUser = useAuth();

  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalVisible(false);
    // 모달 닫을 때 제목과 내용 초기화
    setPostTitle("");
    setPostContent("");
  };

  const handleSubmit = () => {
    const newPost = { title: postTitle, content: postContent };
    createPostInFirestore(currentUser, newPost); //포스트를 파이어베이스에 등록함
    setPosts([newPost, ...posts]); // 새로운 게시물을 배열 맨 앞에 추가하여 최신순으로 정렬

    closeModal();
  };

  const handleLike = (index, likeValue) => {
    // 내가 수정할 부분
  };

  return (
    <div>
      <Navbars />
      <div className="main">
        <div className="user_profile">
          <img src="./images/profile.png" alt="사용자 프로필 사진" />
          <button className="write_post_btn" onClick={openModal}>
            게시물 작성하기
          </button>
        </div>

        <div className="post_list">
          {posts.map((post, index) => (
            <div key={index} className="post_summary">
              <div className="post_title_sum">{post.title}</div>
              <div className="user_info">닉네임 날짜</div>
              <div className="post_cont_sum">
                {post.content.length > 200
                  ? post.content.substring(0, 200) + "..."
                  : post.content}
              </div>
              <Like
                likes={post.likes}
                handleLike={(likeValue) => handleLike(index, likeValue)}
              />
            </div>
          ))}
        </div>

        <div
          className="modal"
          style={{ display: isModalVisible ? "block" : "none" }}
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
