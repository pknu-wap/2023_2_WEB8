// 게시물에 대한 좋아요와 댓글 수 초기화
let likeCount = 0;
let commentCount = 0;

// 좋아요 및 댓글 추가 함수 정의
window.likePost = function(postId) {
  likeCount++;
  document.getElementById(`likeCount-${postId}`).textContent = likeCount;
};

window.addComment = function(postId) {
  commentCount++;
  document.getElementById(`commentCount-${postId}`).textContent = commentCount;
};