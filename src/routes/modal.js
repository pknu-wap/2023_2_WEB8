// '게시글 작성하기' 모달 띄우기
const writePostButton = document.querySelector('.write_post_btn');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close');

writePostButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// 모달 바깥의 윈도우를 누르면 모달창이 닫히도록 설정
window.addEventListener('click', (event) => {
  if (event.target !== modal && event.target !== writePostButton && !modal.contains(event.target)) {
    modal.style.display = 'none';
  }
});
