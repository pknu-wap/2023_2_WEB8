import Article from "./Article";

//임의의 데이터
const articles = [
  { title: "안녕하세요", content: "주저리 주저리..." },
  { title: "교수님", content: "시험 좀 대신 쳐주세요" },
  { title: "데이터", content: "받아오기" },
];

function List({ title }) {
  return (
    <div>
      <h3>{title}</h3>
      {articles.map((article) => {
        return <Article title={article.title} content={article.content} />;
      })}
    </div>
  );
}

export default List;
