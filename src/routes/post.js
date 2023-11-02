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


// 등록 버튼 클릭 시 게시글이 커뮤니티 main의 post_list에 등록
document.querySelector("#post_submit_btn").addEventListener("click", function() {
  const postContentTextarea = document.querySelector('textarea[name="post_content"]'); // name이 post_content인 textarea 불러오기
  let postContent = postContentTextarea.value; // value 속성은 사용자가 textarea에 입력한 텍스트 값
  const postTitleTextarea = document.querySelector('textarea[name="post_title"]');
  let postTitle = postTitleTextarea.value;
  const postList = document.querySelector('.post_list'); // 최신순으로 업로드 하기 위해 list 불러오기
  
  // 사용자가 입력한 줄바꿈을 <br> 태그로 변환 (textarea는 \n을 띄어쓰기 하나로 인식)
  // g 플래그는 전역적으로 문자열 내의 모든 줄바꿈을 찾는 역 (안 쓰면 첫 번째로 발견한 줄바꿈 문자(\n)만을 변경)
  postContent = postContent.replace(/\n/g, "<br>");

  // 새로운 게시물 생성
  let newPost = document.createElement('div');
  newPost.className = 'post';

  // 200자 이상 넘어갈 시 요약된 형태로 보여주기
  if(postContent.length >= 200) {
    newPost.innerHTML = `<div class="post_summary">
      <div class="post_title_sum">
        ${postTitle}
      </div>
      <div class="user_info">
      닉네임    날짜
      </div>
      <div class="post_cont_sum"
        ${postContent.substring(0, 200)}  ...더보기
      </div>
    </div>`
  }
  else {
    newPost.innerHTML = `<div class="post_summary">
      <div class="post_title_sum">
        ${postTitle}
      </div>
      <div class="user_info">
        닉네임    날짜
    </div>
      <div class="post_cont_sum">
        ${postContent.substring(0, 200)}
      </div>
    </div>`
  }

  document.querySelector('.post_list').appendChild(newPost);

  // 요소가 null인지 확인
  const firstChild = postList.firstElementChild;

  if (firstChild) {
    postList.insertBefore(newPost, firstChild); // postList에 자식 요소가 있는 경우 맨 위에 추가
    // insertBefore : DOM에서 요소를 다른 요소 앞에 삽입하는 메서드
  } else {
    postList.appendChild(newPost); // postList에 자식 요소가 없는 경우 새로운 요소 추가
  }

  postContentTextarea.value = '게시물 작성하기'; // 입력 필드의 값을 비움
  postTitleTextarea.value = '제목';
  modal.style.display = 'none'; // 모달 닫기

  // 요약된 정보 클릭 시 새 창에 전체 내용 표시
  newPost.querySelector('.post_summary').addEventListener('click', function(e) {
      e.preventDefault();

      const width = 900; // 새 창의 너비
      const height = 600; // 새 창의 높이

      // 화면의 중앙에 위치시킬 때 사용할 창의 좌표
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height - 170) / 2;
      // 새 창에 전체 내용 텍스트로 표시
      let fullPostWindow = window.open('', 'FullPostWindow', `width=${width}, height=${height}, left=${left}, top=${top}`); // 새 창 열기
      fullPostWindow.document.write(`<div>${postContent}</div>`); // 내용 채우기
  });
});