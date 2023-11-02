const writePostButton = document.querySelector('.write_post_btn');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close');

writePostButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

const postSubmitButton = document.getElementById('post_submit_btn');
postSubmitButton.addEventListener('click', () => {
  // 모달에서 작성된 내용 가져오기
  const postContentTextarea = document.querySelector('textarea[name="post_content"]');
  const postContent = postContentTextarea.value; // 모달에서 가져온 내용

  // 내용을 메인 페이지에 추가
  addNewPostToMainPage(postContent);

  // 모달 닫기
  postContentTextarea.value = '게시물 작성하기'; // 입력 필드의 값을 비움
  modal.style.display = 'none';
});

function addNewPostToMainPage(content) {
  // 실제로 메인 페이지에 새로운 게시물을 추가하는 작업을 수행
  const postList = document.querySelector('.post_list');

  // 예시: 간단한 방법으로 새로운 게시물을 생성하여 추가
  const newPost = document.createElement('div');
  newPost.textContent = content;

  // 메인 페이지의 게시물 목록에 새로운 게시물을 추가
  postList.appendChild(newPost);

}