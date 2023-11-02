import Article from "./Article";
import styled from "styled-components";

//임의의 데이터
const articles = [
  {
    title: "안녕하세요",
    content: "주저리 주저리...",
    img: "images/pic1.jpg",
  },
  {
    title: "교수님",
    content: "시험 좀 대신 쳐주세요",
    img: "images/pic2.jpg",
  },
  { title: "데이터", content: "받아오기", img: "images/pic3.jpg" },
];

const Box = styled.div`
  display: flex;
  width: 900px;
  flex-direction: column;
  padding: 0px 10px;
  margin: 0px 0px;
  height: 660px;
  background: #ffffff;
`;

//더보기 만들기
function List({ title }) {
  return (
    <Box>
      <h3 style={{ fontWeight: "bold", fontSize: "45px" }}>{title}</h3>
      {articles.map((article) => {
        return (
          <div>
            <hr></hr>
            <Article
              title={article.title}
              content={article.content}
              img={article.img}
            />
          </div>
        );
      })}
    </Box>
  );
}

export default List;
