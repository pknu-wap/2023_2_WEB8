// 좋아요 및 댓글 추가 함수 정의
window.likePost = function(postId) {
  // 각 게시물에 대한 좋아요 수를 관리하기 위해 postLikes 객체를 사용
  if (!window.postLikes) {
    window.postLikes = {};
  }

  if (!window.postLikes[postId]) {
    window.postLikes[postId] = 0;
  }

  window.postLikes[postId]++;
  document.getElementById(`likeCount-${postId}`).textContent = window.postLikes[postId];
};

window.addComment = function(postId) {
  // 각 게시물에 대한 댓글 수를 관리하기 위해 postComments 객체를 사용
  if (!window.postComments) {
    window.postComments = {};
  }

  if (!window.postComments[postId]) {
    window.postComments[postId] = 0;
  }

  window.postComments[postId]++;
  document.getElementById(`commentCount-${postId}`).textContent = window.postComments[postId];
};
