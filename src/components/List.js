import Article from "./Article";
import styled from "styled-components";

//임의의 데이터
const articles = [
  {
    id: 1,
    title: "안녕하세요",
    content: "주저리 주저리...",
    img: "images/pic1.jpg",
  },
  {
    id: 2,
    title: "교수님",
    content: "시험 좀 대신 쳐주세요",
    img: "images/pic2.jpg",
  },
  { id: 3, title: "데이터", content: "받아오기", img: "images/pic3.jpg" },
];

//더보기 만들기
function List({ title }) {
  return (
    <div>
      <h3>{title}</h3>
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <hr></hr>
            <Article
              key={article.id}
              title={article.title}
              content={article.content}
              img={article.img}
            />
          </div>
        );
      })}
    </div>
  );
}

export default List;
