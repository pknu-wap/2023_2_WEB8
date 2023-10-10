//여기서 각 리스트들의 css까지 정함
function Article(props) {
  return (
    <div>
      <div>
        <span>{props.title}</span>
        <span>{props.content}</span>
      </div>
      <div>
        <img src="" alt="article image" />
      </div>
    </div>
  );
}

export default Article;
