//현재 로그인된 유저가 작성한 게시글만 보여줌
//인자로 전송된 데이터를 통해 게시글을 보내줌 <<<< 현재 내용
//인자로 유저를 전송받고 해당하는 유저가 작성한 글 보여줌

//사용처
//마이페이지의 내가 작성한글
//커뮤니티 페이지의 작성된 글 목록

//여기서 각 리스트들의 css까지 정함
function Article(props) {
  return (
    <div>
      <div>
        <h5>{props.title}</h5>
        <span>{props.content}</span>
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + props.img} alt={`image`} />
      </div>
    </div>
  );
}

export default Article;
