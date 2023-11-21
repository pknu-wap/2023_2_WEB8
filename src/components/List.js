import Article from "./Article";
import "../css/List.css";
import fetchPostsByUid from "../functions/fetchPostsByUid";
import { useEffect, useState } from "react";

function List(prop) {
  const { title, userInfo } = prop;
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchPostsByUid(setArticles, userInfo, title);
  }, [userInfo, title]);

  return (
    <div className="list-container">
      <h3 className="list-title">{title}</h3>
      {articles.map((article) => {
        return (
          <div key={article.id} className="article-container">
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
