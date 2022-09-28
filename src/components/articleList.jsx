import { Link } from "react-router-dom";
const ArticleList = ({ allArticles }) => {
  return (
    <section>
      {allArticles.map((article) => {
        return (
          <li key={article.article_id} id="articles">
            <Link to={`/articles/${article.article_id}`}>
              {" "}
              <h4>{article.title}</h4>{" "}
            </Link>
            <p>Topic: {article.topic}</p>
            <p>Author: {article.author}</p>
            <p>votes: {article.votes}</p>
            <p>Comments: {article.comment_count}</p>
          </li>
        );
      })}
    </section>
  );
};
export default ArticleList;
