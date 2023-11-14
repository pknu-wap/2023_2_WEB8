// 등록 버튼 클릭 시 게시글이 커뮤니티 main의 post_list에 등록
document.querySelector("#post_submit_btn").addEventListener("click", function() {
  const postContentTextarea = document.querySelector('textarea[name="post_content"]'); // name이 post_content인 textarea 불러오기
  let postContent = postContentTextarea.value; // value : 사용자가 textarea에 입력한 텍스트 값
  const postTitleTextarea = document.querySelector('textarea[name="post_title"]');
  let postTitle = postTitleTextarea.value;
  const postList = document.querySelector('.post_list'); // 최신순으로 업로드 하기 위해 list 불러오기

  /* // 게시물에 대한 좋아요와 댓글 수 초기화
  likeCount = 0;
  commentCount = 0; */
  
  // 사용자가 입력한 줄바꿈을 <br> 태그로 변환 (textarea는 \n을 띄어쓰기 하나로 인식)
  // g 플래그는 전역적으로 문자열 내의 모든 줄바꿈을 찾는 역 (안 쓰면 첫 번째로 발견한 줄바꿈 문자(\n)만을 변경)
  postContent = postContent.replace(/\n/g, "<br>");

  // 새로운 게시물 생성
  let newPost = document.createElement('div');
  newPost.className = 'post';

  // 게시물에 대한 고유한 ID 생성
  const postId = Date.now(); // 현재 시간을 사용

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
      <div class="external_summary">
        <button onclick="likePost(${postId})">좋아요</button>
        <span id="likeCount-${postId}">0</span>명이 좋아합니다.
        <br>
        <button onclick="addComment(${postId})">댓글 달기</button>
        <span id="commentCount-${postId}">0</span>개의 댓글
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
      <div class="external_summary">
        <span id="likeCount-${postId}">0</span>명이 좋아합니다.
        <br>
        <span id="commentCount-${postId}">0</span>개의 댓글
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

  postContentTextarea.value = ''; // 입력 필드의 값을 비움
  postTitleTextarea.value = '';
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

    fullPostWindow.document.write(`
      <html>
          <head>
              <title>Full Post</title>
              <!-- style -->
          </head>
          <body>
              <div>
                  <h1>${postTitle}</h1>
                  닉네임     날짜
                  <p>${postContent}</p>

                  <!-- 댓글 창 -->
                  <div>
                      <textarea id="commentInput" placeholder="댓글을 입력하세요"></textarea>
                      <button onclick="addComment()">등록</button>
                      <ul id="commentList"></ul>
                  </div>

                  <!-- 좋아요 버튼 -->
                  <div>
                      <button onclick="likePost()">좋아요</button>
                      <span id="likeCount-${postId}">0</span>명이 좋아합니다.
                  </div>
                  <!-- 원하는 다양한 HTML 요소를 추가할 수 있습니다. -->
              </div>
              <script src="likeComment.js"></script>
          </body>
      </html>
      `); // 내용 채우기
  });
});