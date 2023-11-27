import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../css/community_style.css";
import Navbars2 from "../components/Navbars2.js";
import Like from "../components/Like.js";
import useAuth from "../functions/useAuth";
import createPostInFirestore from "../functions/createPostInFirestore.js";
import fetchPosts from "../functions/fetchPosts.js";
import PostModal from "../components/PostModal.js";

const Community = () => {
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const currentUser = useAuth();
  const navigate = useNavigate();

  //실시간 업데이트를 위한 state
  //버튼을 클릭할때 변경되도록 함. => useEffect의 의존성배열에 넣음 => 버튼을 클릭할 때마다 fetch함
  const [isUpdate, setIsUpdate] = useState(true);

  useEffect(() => {
    fetchPosts(setPosts);
  }, [isUpdate]);
  // 새로운 게시물을 배열 맨 앞에 추가하여 최신순으로 정렬

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 제목 또는 내용이 비어 있는지 체크
    if (!postTitle) {
      alert("제목을 입력해주세요.");
      return; // 함수 종료
    }

    if (!postContent) {
      alert("게시글 내용을 입력해주세요.");
      return; // 함수 종료
    }
    console.log("HI");
    const newPost = { title: postTitle, content: postContent };
    await createPostInFirestore(currentUser, newPost); // 포스트를 파이어베이스에 등록함

    setCreateModalVisible(false);
    setPostTitle("");
    setPostContent("");
    setIsUpdate((prev) => !prev);
  };

  const [selectedPost, setSelectedPost] = useState(null);

  // 게시물 클릭 시 해당 게시물의 상세 내용을 보여주는 함수
  const handlePostClick = (post) => {
    setSelectedPost(post);
    setDetailModalVisible(true); // 게시물 클릭 시 모달 열기
  };

  const openCreateModal = () => {
    if (currentUser) {
      setCreateModalVisible(true);
    } else {
      // 사용자가 로그인하지 않은 경우 경고창 띄우고 로그인 페이지로 이동
      alert("로그인이 필요한 서비스입니다.");
      // 로그인 페이지로 이동하는 코드 추가
      navigate(`${process.env.PUBLIC_URL}/login`);
    }
  };

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
          <img
            src="./images/profile.png"
            alt="사용자 프로필 사진"
            onClick={() => navigate(`${process.env.PUBLIC_URL}/myPage`)}
          />
          <button className="write_post_btn" onClick={openCreateModal}>
            게시물 작성하기
          </button>
        </div>

        <div className="post_list">
          {posts.map((post, index) => {
            return (
              <div key={post.id} className="post_summary">
                <div onClick={() => handlePostClick(post)}>
                  <div className="post_title_sum">{post.title}</div>
                  <div className="post_info">
                    <div className="user_info">작성자 : {post.userName} | </div>
                    <div className="post_skin">
                      {" "}
                      피부 타입 : {post.userSkinType} |{" "}
                    </div>
                    <div> 작성일 : {post.timestamp}</div>
                  </div>
                  <div className="post_cont_sum">
                    {post.content.length > 200
                      ? post.content.substring(0, 200) + "..."
                      : post.content}
                  </div>
                </div>
                <Like
                  className="heart"
                  postId={post.id}
                  postLikes={post.likes}
                />
              </div>
            );
          })}
        </div>

        <PostModal
          setIsUpdate={setIsUpdate}
          currentUser={currentUser}
          post={selectedPost}
          onClose={closeModal}
          isVisible={isDetailModalVisible}
        />

        <div
          className="modal"
          style={{ display: isCreateModalVisible ? "block" : "none" }}
        >
          <form className="modal-content">
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Community;
