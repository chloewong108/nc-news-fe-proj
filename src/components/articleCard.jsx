import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [currArticle, setCurrArticle] = useState({});

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setCurrArticle(article);
    });
  }, [article_id]);

  return (
    <div id="article-card">
      <h1 id="article-card-title">{currArticle.title}</h1>
      <p>{currArticle.author}</p>
      <p>{currArticle.created_at}</p>
      <p id="body">{currArticle.body}</p>
      <p>{currArticle.votes}</p>
    </div>
  );
};

export default ArticlePage;
