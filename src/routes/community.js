import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './community_style.css';
import './community_post.css';

const Community = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSubmit = () => {
    // 게시물 등록 로직을 추가하세요.
    // 현재는 단순히 posts 배열에 새로운 게시물을 추가하는 예시입니다.
    const newPost = { title: postTitle, content: postContent };
    setPosts([...posts, newPost]);
    closeModal();
  };

  return (
    <div>
      <header>
        <img className="logo_img" src="../../public/images/logo_black.png" alt="LOGO" />
        <div className="nav_list">
          <button className="nav_button">
            <img className="nav_img" src="../../public/images/cosmetics.png" alt="화장품 페이지" />
          </button>
          <button className="nav_button">
            <img className="nav_img" src="../../public/images/bell.png" alt="알림" />
          </button>
          <button className="nav_button">
            <img className="nav_img" src="../../public/images/Mypage.png" alt="마이페이지" />
          </button>
        </div>
      </header>

      <hr className="line" />

      <div className="main">
        <div className="user_profile">
          <img src="../../public/images/profile.png" alt="사용자 프로필 사진" />
          <button className="write_post_btn" onClick={openModal}>게시물 작성하기</button>
        </div>

        <div className="modal" style={{ display: isModalVisible ? 'block' : 'none' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>게시물 작성</h2>
              <span className="close" onClick={closeModal}>&times;</span>
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
                rows="35"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              ></textarea>
            </div>
            <div className="post_submit_btn">
              <button id="post_submit_btn" onClick={handleSubmit}>등록</button>
            </div>
          </div>
        </div>

        <div className="sort_list_box">
          <div className="dropdown_content">
            <a href="latest_order">최신순</a>
            <a href="#" className="hidden">인기순</a>
          </div>
        </div>

        <div className="post_list">
          {posts.map((post, index) => (
            <div key={index} className="post_summary">
              <div className="post_title_sum">{post.title}</div>
              <div className="user_info">닉네임 날짜</div>
              <div className="post_cont_sum">{post.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Community />, document.getElementById('root'));
